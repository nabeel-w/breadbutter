import { EmbeddingType, Talent } from "@prisma/client";
import prisma from "../prisma";
import { createEmbedding } from "../../utils/createEmbedding";
import { randomUUID } from "crypto";

export const createTalentEmbedding = async (talentProfile: Talent) => {
  try {
    const talentProfileData = `
        Talent Profile:
        Name: ${talentProfile.name}
        City: ${talentProfile.city}
        Experience: ${talentProfile.experienceYears} years
        Budget Range: $${talentProfile.budgetMin} - $${talentProfile.budgetMax}

        Skills: ${talentProfile.skills.join(", ")}
        Categories: ${talentProfile.categories.join(", ")}
        Portfolio: ${talentProfile.portfolioLinks.join(", ")}
        `;
    const embeddings = await createEmbedding(talentProfileData);

    const values = embeddings
      .map(
        (em) =>
          `('${randomUUID()}', '${EmbeddingType.TALENT}', '${
            talentProfile.id
          }', '[${em.values?.join(",")}]'::vector)`
      )
      .join(", ");

    await prisma.$executeRawUnsafe(`
        INSERT INTO "Embedding" ("id", "type", "entityId", vector)
        VALUES ${values}
        `);
  } catch (error) {
    console.error("Error creating talent embedding:", error);
    throw new Error("Failed to create talent embedding");
  }
};
