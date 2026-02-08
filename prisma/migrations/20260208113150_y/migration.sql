/*
  Warnings:

  - You are about to drop the column `videoPath` on the `(ourCoupleImage)` table. All the data in the column will be lost.
  - Added the required column `imagePath` to the `(ourCoupleImage)` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "(ourCoupleImage)" DROP COLUMN "videoPath",
ADD COLUMN     "imagePath" TEXT NOT NULL;
