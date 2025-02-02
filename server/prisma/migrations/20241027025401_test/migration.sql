-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "Asset" (
    "id" SERIAL NOT NULL,
    "process" VARCHAR(255),
    "name" VARCHAR(255),
    "description" VARCHAR(255),
    "format" VARCHAR(255),
    "software_version" VARCHAR(255),
    "manufacturer" VARCHAR(255),
    "physical_location" VARCHAR(255),
    "electronic_location" VARCHAR(255),
    "responsible" VARCHAR(255),
    "user_access" VARCHAR(255),
    "access_date" TIMESTAMP(3),
    "state" BOOLEAN,
    "entry_date" TIMESTAMP(3),
    "retirement_date" TIMESTAMP(3),
    "availability" BOOLEAN,
    "integrity" TEXT,
    "extra_atributes" JSON,
    "confidentiality" TEXT,
    "criticality" TEXT,
    "asset_type_id" INTEGER,
    "user_id" INTEGER,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Asset_type" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "category" VARCHAR(255) NOT NULL,

    CONSTRAINT "Asset_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vulnerability" (
    "id" SERIAL NOT NULL,
    "control_code" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Vulnerability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Control" (
    "id" SERIAL NOT NULL,
    "code" INTEGER NOT NULL,
    "description_iso" TEXT NOT NULL,
    "description_city_hall" TEXT NOT NULL,

    CONSTRAINT "Control_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Threath" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Threath_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Action_plan" (
    "id" SERIAL NOT NULL,
    "residual_risk" TEXT NOT NULL,
    "treatment" VARCHAR(255) NOT NULL,
    "action_plan" TEXT NOT NULL,
    "responsible" VARCHAR(255) NOT NULL,
    "implementation_date" TIMESTAMP(3),
    "control_tracking" TEXT,
    "state" VARCHAR(255) NOT NULL,
    "monitoring" TEXT,
    "monitoring_date" TIMESTAMP(3),
    "indicator" TEXT,
    "risk_id" INTEGER NOT NULL,

    CONSTRAINT "Action_plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Risk_type" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "classification" VARCHAR(255) NOT NULL,

    CONSTRAINT "Risk_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Risk" (
    "id" SERIAL NOT NULL,
    "frequency" INTEGER NOT NULL,
    "penalty" INTEGER NOT NULL,
    "inherent_probability" VARCHAR(255),
    "probability_percentage" DOUBLE PRECISION,
    "inherent_impact" VARCHAR(255),
    "impact_percentage" DOUBLE PRECISION,
    "inherent_risk" VARCHAR(255),
    "control_type" VARCHAR(255),
    "implementation" VARCHAR(255),
    "control_qualification" DOUBLE PRECISION,
    "residual_probability" TEXT,
    "residual_impact" TEXT,
    "final_risk" VARCHAR(255),
    "risk_type_id" INTEGER NOT NULL,
    "threat_id" INTEGER NOT NULL,
    "asset_type_id" INTEGER NOT NULL,
    "vulnerability_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Risk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "Role"[] DEFAULT ARRAY['USER']::"Role"[],
    "refreshToken" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Control_code_key" ON "Control"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Action_plan_risk_id_key" ON "Action_plan"("risk_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_asset_type_id_fkey" FOREIGN KEY ("asset_type_id") REFERENCES "Asset_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vulnerability" ADD CONSTRAINT "Vulnerability_control_code_fkey" FOREIGN KEY ("control_code") REFERENCES "Control"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action_plan" ADD CONSTRAINT "Action_plan_risk_id_fkey" FOREIGN KEY ("risk_id") REFERENCES "Risk"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Risk" ADD CONSTRAINT "Risk_risk_type_id_fkey" FOREIGN KEY ("risk_type_id") REFERENCES "Risk_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Risk" ADD CONSTRAINT "Risk_threat_id_fkey" FOREIGN KEY ("threat_id") REFERENCES "Threath"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Risk" ADD CONSTRAINT "Risk_asset_type_id_fkey" FOREIGN KEY ("asset_type_id") REFERENCES "Asset_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Risk" ADD CONSTRAINT "Risk_vulnerability_id_fkey" FOREIGN KEY ("vulnerability_id") REFERENCES "Vulnerability"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Risk" ADD CONSTRAINT "Risk_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
