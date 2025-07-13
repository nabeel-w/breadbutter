/*
  Warnings:

  - A unique constraint covering the columns `[gigId,talentId]` on the table `Recommendation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Recommendation_gigId_talentId_key" ON "Recommendation"("gigId", "talentId");
