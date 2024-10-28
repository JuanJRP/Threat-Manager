import { RiskTypeRepository } from "./risk_type.repository";
import { RiskTypeDTO } from "./risk_type.models";

//Esta capa contiene la lógica de negocio, actuando como un intermediario entre el controlador y el repositorio.
//Llama a las funciones del repositorio para realizar acciones CRUD.

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

  updateRiskType(id: number, data: Partial<RiskTypeDTO>) {
    return this.riskTypeRepository.updateRiskType(id, data);
  }

  deleteRiskType(id: number) {
    return this.riskTypeRepository.deleteRiskType(id);
  }
}

export default new RiskTypeService();
