-- CreateTable
CREATE TABLE "Asset" (
    "id" SERIAL NOT NULL,
    "process" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "asset_type_id" INTEGER NOT NULL,
    "format" VARCHAR(255) NOT NULL,
    "software_version" VARCHAR(255) NOT NULL,
    "manufacturer" VARCHAR(255) NOT NULL,
    "physical_location" VARCHAR(255) NOT NULL,
    "electronic_location" VARCHAR(255) NOT NULL,
    "responsible" VARCHAR(255) NOT NULL,
    "user_access" VARCHAR(255) NOT NULL,
    "access_date" TIMESTAMP(3) NOT NULL,
    "state" BOOLEAN NOT NULL,
    "entry_date" TIMESTAMP(3) NOT NULL,
    "retirement_date" TIMESTAMP(3) NOT NULL,
    "availability" BOOLEAN NOT NULL,
    "integrity" TEXT NOT NULL,
    "confidentiality" TEXT NOT NULL,

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
    "classification" INTEGER NOT NULL,

    CONSTRAINT "Control_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Affect" (
    "id" SERIAL NOT NULL,
    "probability" INTEGER NOT NULL,
    "impact_id" INTEGER NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "implementation" VARCHAR(255) NOT NULL,
    "control_qualification" INTEGER NOT NULL,
    "documented" BOOLEAN NOT NULL,
    "frequency" VARCHAR(255) NOT NULL,
    "evidence" VARCHAR(255) NOT NULL,

    CONSTRAINT "Affect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Impact" (
    "id" SERIAL NOT NULL,
    "penalty" INTEGER NOT NULL,
    "impact" INTEGER NOT NULL,
    "risk_zone" VARCHAR(255),
    "probability" VARCHAR(255),
    "comment" TEXT,
    "risk_id" INTEGER NOT NULL,

    CONSTRAINT "Impact_pkey" PRIMARY KEY ("id")
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
    "implementation_date" TIMESTAMP(3) NOT NULL,
    "control_tracking" TEXT NOT NULL,
    "state" VARCHAR(255) NOT NULL,
    "monitoring" TEXT NOT NULL,
    "monitoring_date" TIMESTAMP(3) NOT NULL,
    "indicator" TEXT NOT NULL,
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
    "risk_type_id" INTEGER NOT NULL,
    "frequency" INTEGER,
    "threat_id" INTEGER NOT NULL,
    "asset_type_id" INTEGER NOT NULL,
    "vulnerability_id" INTEGER NOT NULL,

    CONSTRAINT "Risk_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Control_code_key" ON "Control"("code");

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_asset_type_id_fkey" FOREIGN KEY ("asset_type_id") REFERENCES "Asset_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vulnerability" ADD CONSTRAINT "Vulnerability_control_code_fkey" FOREIGN KEY ("control_code") REFERENCES "Control"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Affect" ADD CONSTRAINT "Affect_impact_id_fkey" FOREIGN KEY ("impact_id") REFERENCES "Impact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Impact" ADD CONSTRAINT "Impact_risk_id_fkey" FOREIGN KEY ("risk_id") REFERENCES "Risk"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
