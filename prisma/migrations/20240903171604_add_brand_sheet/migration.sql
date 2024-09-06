-- CreateTable
CREATE TABLE "Brand" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "influencerCategoryId" TEXT NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_InfluencerBrands" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Brand_nome_key" ON "Brand"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "_InfluencerBrands_AB_unique" ON "_InfluencerBrands"("A", "B");

-- CreateIndex
CREATE INDEX "_InfluencerBrands_B_index" ON "_InfluencerBrands"("B");

-- AddForeignKey
ALTER TABLE "Brand" ADD CONSTRAINT "Brand_influencerCategoryId_fkey" FOREIGN KEY ("influencerCategoryId") REFERENCES "InfluencerCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InfluencerBrands" ADD CONSTRAINT "_InfluencerBrands_A_fkey" FOREIGN KEY ("A") REFERENCES "Brand"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InfluencerBrands" ADD CONSTRAINT "_InfluencerBrands_B_fkey" FOREIGN KEY ("B") REFERENCES "Influencer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
