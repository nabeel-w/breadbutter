import { createTalentEmbedding } from "../lib/data/talent";
import { redis } from "../lib/redis";
import { Job, Worker } from "bullmq";
import prisma from "../lib/prisma";

const talentWorker = new Worker("talent-queue", async (job: Job) => {
    console.log("Processing talent job:", job.id);
    if(job.name === "created-talent"){
        const data = job.data;
        console.log("Created talent data:", data);
        try {
            await createTalentEmbedding(data);
        } catch (error) {
            console.error(`Error processing talent job ${job.id}:`, error);
            throw new Error("Failed to process talent job");
        }
    }
}, {
  connection: redis,
});

talentWorker.on('completed', (job) => {
  console.log(`✅ Job ${job.id} completed`);
});

talentWorker.on('failed', (job, err) => {
  console.error(`❌ Job ${job?.id} failed:`, err);
  // Optionally, you can add the job to a "failed" queue for further processing
});

// Optional: Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down worker...');
  await prisma.$disconnect();
  process.exit(0);
});