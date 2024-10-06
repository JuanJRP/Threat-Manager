/*
  Warnings:

  - Made the column `risk_zone` on table `Impact` required. This step will fail if there are existing NULL values in that column.
  - Made the column `probability` on table `Impact` required. This step will fail if there are existing NULL values in that column.
  - Made the column `comment` on table `Impact` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Action_plan" ALTER COLUMN "implementation_date" DROP NOT NULL,
ALTER COLUMN "control_tracking" DROP NOT NULL,
ALTER COLUMN "monitoring" DROP NOT NULL,
ALTER COLUMN "monitoring_date" DROP NOT NULL,
ALTER COLUMN "indicator" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Affect" ALTER COLUMN "probability" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Asset" ALTER COLUMN "physical_location" DROP NOT NULL,
ALTER COLUMN "retirement_date" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Control" ALTER COLUMN "classification" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Impact" ALTER COLUMN "impact" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "risk_zone" SET NOT NULL,
ALTER COLUMN "probability" SET NOT NULL,
ALTER COLUMN "comment" SET NOT NULL;
