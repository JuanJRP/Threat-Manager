/*
  Warnings:

  - You are about to drop the column `availability` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `confidentiality` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `integrity` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `classification` on the `Risk_type` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Risk_type` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Risk_type` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Asset" DROP COLUMN "availability",
DROP COLUMN "confidentiality",
DROP COLUMN "integrity";

-- AlterTable
ALTER TABLE "Risk_type" DROP COLUMN "classification",
DROP COLUMN "description",
DROP COLUMN "name",
ADD COLUMN     "availability" BOOLEAN,
ADD COLUMN     "confidentiality" BOOLEAN,
ADD COLUMN     "integrity" BOOLEAN;
