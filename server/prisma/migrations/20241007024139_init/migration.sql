/*
  Warnings:

  - A unique constraint covering the columns `[risk_id]` on the table `Action_plan` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[impact_id]` on the table `Affect` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[risk_id]` on the table `Impact` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Action_plan_risk_id_key" ON "Action_plan"("risk_id");

-- CreateIndex
CREATE UNIQUE INDEX "Affect_impact_id_key" ON "Affect"("impact_id");

-- CreateIndex
CREATE UNIQUE INDEX "Impact_risk_id_key" ON "Impact"("risk_id");
