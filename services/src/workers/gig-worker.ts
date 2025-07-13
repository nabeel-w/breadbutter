import { createGigEmbedding, setRecommendationsForGig } from "../lib/data/gig";
import { redis } from "../lib/redis";
import { Worker } from "bullmq";

const gigWorker = new Worker("gig-queue", async (job) => {
    console.log("Processing gig job:", job.id);
    if (job.name === "created-gig") {
        const data = job.data;
        console.log("Created gig data:", data);
        try {
            await createGigEmbedding(data);
        } catch (error) {
            console.error(`Error processing gig job ${job.id}:`, error);
            throw new Error("Failed to process gig job");
        }
    }
    if (job.name === "talent-recommendation") {
        const gigId = job.data;
        console.log("Setting recommendations for gig:", gigId);
        try {
            await setRecommendationsForGig(gigId);
        } catch (error) {
            console.error(`Error setting recommendations for gig ${gigId}:`, error);
            throw new Error("Failed to set recommendations for gig");
        }
    }
}, {
    connection: redis,
});

gigWorker.on('completed', (job) => {
    console.log(`✅ Job ${job.id} completed`);
});

gigWorker.on('failed', (job, err) => {
    console.error(`❌ Job ${job?.id} failed:`, err);
    // Optionally, you can add the job to a "failed" queue for further processing
});

// Optional: Graceful shutdown
process.on('SIGINT', async () => {
    console.log('Shutting down worker...');
    await redis.quit();
    process.exit(0);
});