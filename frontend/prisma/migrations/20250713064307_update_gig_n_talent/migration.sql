/*
  Warnings:

  - Added the required column `status` to the `Gig` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "GigStatus" AS ENUM ('ACTIVE', 'CREATED', 'TALENT_RECOMMENDED', 'TALENT_SELECTED', 'COMPLETED', 'PENDING');

-- AlterTable
ALTER TABLE "Gig" ADD COLUMN     "skills" TEXT[],
ADD COLUMN     "status" "GigStatus" NOT NULL;

-- CreateTable
CREATE TABLE "_GigRecommendedTalents" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_GigRecommendedTalents_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_GigRecommendedTalents_B_index" ON "_GigRecommendedTalents"("B");

-- AddForeignKey
ALTER TABLE "_GigRecommendedTalents" ADD CONSTRAINT "_GigRecommendedTalents_A_fkey" FOREIGN KEY ("A") REFERENCES "Gig"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GigRecommendedTalents" ADD CONSTRAINT "_GigRecommendedTalents_B_fkey" FOREIGN KEY ("B") REFERENCES "Talent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
