/*
  Warnings:

  - You are about to alter the column `probability_percentage` on the `Risk` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(5,2)`.
  - You are about to alter the column `impact_percentage` on the `Risk` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(5,2)`.
  - You are about to alter the column `control_qualification` on the `Risk` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(5,2)`.

*/
-- AlterTable
ALTER TABLE "Risk" ALTER COLUMN "probability_percentage" SET DATA TYPE DECIMAL(5,2),
ALTER COLUMN "impact_percentage" SET DATA TYPE DECIMAL(5,2),
ALTER COLUMN "control_qualification" SET DATA TYPE DECIMAL(5,2);
