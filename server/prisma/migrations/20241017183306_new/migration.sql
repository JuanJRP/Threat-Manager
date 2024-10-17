/*
  Warnings:

  - You are about to alter the column `probability_percentage` on the `Risk` table. The data in that column could be lost. The data in that column will be cast from `Decimal(5,2)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Risk" ALTER COLUMN "probability_percentage" SET DATA TYPE DOUBLE PRECISION;
