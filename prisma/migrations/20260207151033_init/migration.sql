/*
  Warnings:

  - You are about to drop the column `descriptioin` on the `(ourCoupleImage)` table. All the data in the column will be lost.
  - You are about to drop the column `descriptioin` on the `(soloImage)` table. All the data in the column will be lost.
  - Added the required column `description` to the `(ourCoupleImage)` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `(soloImage)` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "(ourCoupleImage)" DROP COLUMN "descriptioin",
ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "(soloImage)" DROP COLUMN "descriptioin",
ADD COLUMN     "description" TEXT NOT NULL;
