// risk_type.services.ts
import { RiskTypeRepository } from "./risk_type.repository";
import { RiskTypeDTO } from "./risk_type.models";

class RiskTypeService {
  private riskTypeRepository = new RiskTypeRepository();

  createRiskType(riskType: RiskTypeDTO) {
    return this.riskTypeRepository.createRiskType(riskType);
  }

  getAllRiskTypes() {
    return this.riskTypeRepository.getAllRiskTypes();
  }

  getRiskTypeById(id: number) {
    return this.riskTypeRepository.getRiskTypeById(id);
  }

  deleteRiskType(id: number) {
    return this.riskTypeRepository.deleteRiskType(id);
  }
}

export default new RiskTypeService();



