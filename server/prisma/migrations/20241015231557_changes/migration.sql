/*
  Warnings:

  - You are about to drop the column `control_qualificatiob` on the `Risk` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Risk" DROP COLUMN "control_qualificatiob",
ADD COLUMN     "control_qualification" DECIMAL(65,30);
