/*
  Warnings:

  - You are about to drop the column `nicho` on the `Influencer` table. All the data in the column will be lost.
  - Added the required column `influencerCategoryId` to the `Influencer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Influencer" DROP COLUMN "nicho",
ADD COLUMN     "influencerCategoryId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "InfluencerCategory" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "InfluencerCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InfluencerCategory_nome_key" ON "InfluencerCategory"("nome");

-- AddForeignKey
ALTER TABLE "Influencer" ADD CONSTRAINT "Influencer_influencerCategoryId_fkey" FOREIGN KEY ("influencerCategoryId") REFERENCES "InfluencerCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
