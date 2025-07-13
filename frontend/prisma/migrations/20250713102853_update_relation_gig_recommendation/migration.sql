/*
  Warnings:

  - You are about to drop the `_GigRecommendedTalents` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_GigRecommendedTalents" DROP CONSTRAINT "_GigRecommendedTalents_A_fkey";

-- DropForeignKey
ALTER TABLE "_GigRecommendedTalents" DROP CONSTRAINT "_GigRecommendedTalents_B_fkey";

-- DropTable
DROP TABLE "_GigRecommendedTalents";

-- CreateTable
CREATE TABLE "Recommendation" (
    "id" TEXT NOT NULL,
    "gigId" TEXT NOT NULL,
    "talentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "details" TEXT,
    "ranking" INTEGER NOT NULL,

    CONSTRAINT "Recommendation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Recommendation" ADD CONSTRAINT "Recommendation_gigId_fkey" FOREIGN KEY ("gigId") REFERENCES "Gig"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recommendation" ADD CONSTRAINT "Recommendation_talentId_fkey" FOREIGN KEY ("talentId") REFERENCES "Talent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
