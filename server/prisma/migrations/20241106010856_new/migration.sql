/*
  Warnings:

  - Added the required column `name` to the `Risk_type` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Risk_type" ADD COLUMN     "name" VARCHAR(255) NOT NULL;
