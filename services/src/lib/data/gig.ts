import { EmbeddingType, Gig } from "@prisma/client";
import { createEmbedding } from "../../utils/createEmbedding";
import prisma from "../prisma";
import { gigQueue } from "../queue";
import { setTalentsForGig } from "../../utils/getRecommend";
import { randomUUID } from "crypto";

export const createGigEmbedding = async (gigProfile: Gig) => {
  try {
    const gigProfileData = `
        Gig Opportunity:
        Title: ${gigProfile.title}
        Location: ${gigProfile.location || "Remote"}
        Budget Range: $${gigProfile.budgetMin} - $${gigProfile.budgetMax}

        Category: ${gigProfile.category}
        Style Preferences: ${gigProfile.stylePreferences.join(", ")}
        Required Skills: ${gigProfile.skills.join(", ")}
        Description: ${gigProfile.description}
        `;
    const embeddings = await createEmbedding(gigProfileData);

    const values = embeddings
      .map(
        (em) =>
          `('${randomUUID()}', '${EmbeddingType.GIG}', '${gigProfile.id}', '[${
            em.values
          }]'::vector)`
      )
      .join(", ");

    await prisma.$executeRawUnsafe(`
        INSERT INTO "Embedding" ( "id", "type", "entityId", vector)
        VALUES ${values}
        `);
    console.log("Gig embedding created successfully");
    await gigQueue.add("talent-recommendation", gigProfile.id, {
      attempts: 100, // retry 3 times
      backoff: {
        type: "exponential",
        delay: 5000, // wait 5s between retries
      },
    });
  } catch (error) {
    console.error("Error creating gig embedding:", error);
    throw new Error("Failed to create gig embedding");
  }
};

export const setRecommendationsForGig = async (gigId: string) => {
  try {
    await setTalentsForGig(gigId);
  } catch (error) {
    console.error("Error setting talents for gig:", error);
    throw new Error("Failed to set talents for gig");
  }
};
