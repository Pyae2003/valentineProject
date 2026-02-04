/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `songlist` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "songlist_title_key" ON "songlist"("title");
