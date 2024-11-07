/*
  Warnings:

  - You are about to drop the column `modifiedAt` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Profile_phoneNumber_key";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "modifiedAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
