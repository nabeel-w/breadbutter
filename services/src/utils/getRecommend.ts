import { Embedding, EmbeddingType, Gig, GigStatus } from "@prisma/client";
import prisma from "../lib/prisma";

type SimilarTalentWithScore = {
  id: string;
  name: string;
  city: string;
  categories: string[];
  skills: string[];
  experienceYears: number;
  budgetMin: number;
  budgetMax: number;
  portfolioLinks: string[];
  createdAt: Date;
  updatedAt: Date;
  similarity: number;
};

export const setTalentsForGig = async (gigId: string) => {
  try {
    const gig = await prisma.gig.findUnique({
      where: { id: gigId },
    });
    if (!gig) {
      throw new Error(`Gig with ID ${gigId} not found`);
    }
    const result = await prisma.$queryRawUnsafe<{ vector: number[] }[]>(
      `
        SELECT vector::float4[] 
        FROM "Embedding"
        WHERE type = $1::"EmbeddingType" AND "entityId" = $2
        LIMIT 1
      `,
      EmbeddingType.GIG,
      gigId
    );

    const gigVector = result?.[0]?.vector;

    // Convert embedding to pgvector string
    const toPgvector = (vec: number[]) => `[${vec.join(",")}]`;

    // Raw SQL query using Prisma
    const similarTalents = await prisma.$queryRawUnsafe<
      SimilarTalentWithScore[]
    >(
      `
        SELECT 
            "Talent".*,
            1 - ("Embedding".vector <#> $1::vector) AS similarity
        FROM "Embedding"
        JOIN "Talent" ON "Talent".id = "Embedding"."entityId"
        WHERE "Embedding".type = 'TALENT'
        ORDER BY similarity DESC
        LIMIT 10
        `,
      toPgvector(gigVector)
    );

    const enrichedMatches = similarTalents.map((talent) => {
      const { score, explanation } = calculateScore(gig, talent);
      return {
        talent,
        similarity: talent.similarity,
        score,
        totalScore: talent.similarity * 100 + score, // Combine vector + rule score
        explanation,
      };
    });

    await Promise.all(
      enrichedMatches
        .sort((a, b) => b.totalScore - a.totalScore)
        .map((match, index) =>
          prisma.recommendation.upsert({
            where: {
              gigId_talentId: {
                gigId: gig.id,
                talentId: match.talent.id,
              },
            },
            update: {
              ranking: index + 1,
              details: match.explanation,
            },
            create: {
              id: `${gig.id}_${match.talent.id}`, // or use uuid if preferred
              gigId: gig.id,
              talentId: match.talent.id,
              ranking: index + 1,
              details: match.explanation,
            },
          })
        )
    );
    await prisma.gig.update({
      where: { id: gigId },
      data: {
        status: GigStatus.TALENT_RECOMMENDED,
      },
    });
  } catch (error) {
    console.error("Error setting talents for gig:", error);
    throw new Error("Failed to set talents for gig");
  }
};

function calculateScore(gig: Gig, talent: SimilarTalentWithScore) {
  let score = 0;
  let explanation: string[] = [];
  console.log("Calculating score for talent:", talent);

  // Skill overlap
  const skillMatch = talent.skills.length > 0 ? talent.skills.filter((skill) =>
    gig.skills.includes(skill)
  ).length : 0;
  if (skillMatch > 0) {
    const points = skillMatch * 2;
    score += points;
    explanation.push(`Skill overlap: +${points}`);
  }

  // Budget match
  if (
    gig.budgetMin != null &&
    gig.budgetMax != null &&
    talent.budgetMin <= gig.budgetMax &&
    talent.budgetMax >= gig.budgetMin
  ) {
    score += 3;
    explanation.push("Budget within range: +3");
  }

  // Location match
  if (talent.city && gig.location && talent.city === gig.location) {
    score += 2;
    explanation.push("Location match: +2");
  }

  // Category match
  if (talent.categories.includes(gig.category)) {
    score += 2;
    explanation.push("Category match: +2");
  }

  // You can add more: stylePreferences, keywords in portfolio, etc.

  return { score, explanation: explanation.join(", ") };
}
