/*
  Warnings:

  - You are about to drop the column `classification` on the `Control` table. All the data in the column will be lost.
  - You are about to drop the `Affect` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Impact` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `user_id` to the `Asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `penalty` to the `Risk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Risk` table without a default value. This is not possible if the table is not empty.
  - Made the column `frequency` on table `Risk` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Affect" DROP CONSTRAINT "Affect_impact_id_fkey";

-- DropForeignKey
ALTER TABLE "Impact" DROP CONSTRAINT "Impact_risk_id_fkey";

-- AlterTable
ALTER TABLE "Asset" ADD COLUMN     "extra_atributes" JSON,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Control" DROP COLUMN "classification";

-- AlterTable
ALTER TABLE "Risk" ADD COLUMN     "control_qualificatiob" DECIMAL(65,30),
ADD COLUMN     "control_type" VARCHAR(255),
ADD COLUMN     "final_risk" VARCHAR(255),
ADD COLUMN     "impact_percentage" DECIMAL(65,30),
ADD COLUMN     "implementation" VARCHAR(255),
ADD COLUMN     "inherent_impact" VARCHAR(255),
ADD COLUMN     "inherent_probability" VARCHAR(255),
ADD COLUMN     "inherent_risk" VARCHAR(255),
ADD COLUMN     "penalty" INTEGER NOT NULL,
ADD COLUMN     "probability_percentage" DECIMAL(65,30),
ADD COLUMN     "residual_impact" DECIMAL(65,30),
ADD COLUMN     "residual_probability" DECIMAL(65,30),
ADD COLUMN     "user_id" INTEGER NOT NULL,
ALTER COLUMN "frequency" SET NOT NULL;

-- DropTable
DROP TABLE "Affect";

-- DropTable
DROP TABLE "Impact";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" VARCHAR(255) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Risk" ADD CONSTRAINT "Risk_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
