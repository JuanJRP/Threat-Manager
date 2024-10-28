import { Prisma } from "@prisma/client";
import RiskRepository from "./risk.repository";
import { HttpException } from "../../utils/HttpExceptions";
import RiskCalculatedAtributes from "./risk.functions";

const riskRepository = new RiskRepository();
const riskCalculatedAtributes = new RiskCalculatedAtributes();

class RiskService {
  private readonly riskRepository: RiskRepository;
  private readonly riskCalculatedAtributes: RiskCalculatedAtributes;
  constructor() {
    this.riskRepository = riskRepository;
    this.riskCalculatedAtributes = riskCalculatedAtributes;
  }
  async createRisk(data: Prisma.RiskCreateInput) {
    const { frequency, penalty, asset_type } = data;

    const inherentProbability =
      this.riskCalculatedAtributes.inherentProbability(frequency);
    const probabilityPercentage =
      this.riskCalculatedAtributes.probabilityPercentage(inherentProbability);
    const inherentImpact = this.riskCalculatedAtributes.inherentImpact(penalty);
    const impactPercentage =
      this.riskCalculatedAtributes.impactPercentage(inherentImpact);
    const inherentRisk = this.riskCalculatedAtributes.inherentRisk(
      inherentProbability,
      inherentImpact
    );
    const controlType = this.riskCalculatedAtributes.controlType(asset_type);
    const implementation =
      this.riskCalculatedAtributes.implemetation(asset_type);
    const controlCualification =
      this.riskCalculatedAtributes.controlCualification(
        controlType,
        implementation
      );
    const residualProbability =
      this.riskCalculatedAtributes.residualProbability(
        probabilityPercentage,
        controlCualification
      );
    const residualImpact = this.riskCalculatedAtributes.residualImpact(
      impactPercentage,
      controlCualification
    );
    const finalRisk = this.riskCalculatedAtributes.finalRisk(
      residualProbability,
      residualImpact
    );
    return await this.riskRepository.create({
      ...data,
      inherent_probability: inherentProbability,
      probability_percentage: probabilityPercentage,
      inherent_impact: inherentImpact,
      impact_percentage: impactPercentage,
      inherent_risk: inherentRisk,
      control_type: controlType.type,
      implementation: implementation.type,
      control_qualification: controlCualification,
      residual_probability: residualProbability,
      residual_impact: residualImpact,
      final_risk: finalRisk,
    });
  }
  async getAllRisks() {
    return this.riskRepository.getAll();
  }
  async getRiskById(id: number) {
    const risk = await this.riskRepository.getById(id);
    if (!risk) throw new HttpException(404, "Riesgo no encontrado");
    return risk;
  }

  async updateRisk(id: number, risk: Prisma.RiskUpdateInput) {
    await this.getRiskById(id);
    return await this.riskRepository.update(id, risk);
  }

  async deleteRisk(id: number) {
    await this.getRiskById(id);
    await this.riskRepository.delete(id);
  }
}

export default RiskService;
