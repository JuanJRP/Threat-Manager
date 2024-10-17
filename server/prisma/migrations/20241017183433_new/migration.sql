/*
  Warnings:

  - You are about to alter the column `impact_percentage` on the `Risk` table. The data in that column could be lost. The data in that column will be cast from `Decimal(5,2)` to `DoublePrecision`.
  - You are about to alter the column `control_qualification` on the `Risk` table. The data in that column could be lost. The data in that column will be cast from `Decimal(5,2)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Risk" ALTER COLUMN "impact_percentage" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "control_qualification" SET DATA TYPE DOUBLE PRECISION;
