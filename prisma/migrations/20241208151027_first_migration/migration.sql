-- CreateTable
CREATE TABLE "url" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "shortUrl" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "url_id_key" ON "url"("id");
