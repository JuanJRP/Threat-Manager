import Risk from "./risk.models";
import RiskRepository from "./risk.repository";

class RiskService {
  async createRisk(data: Risk) {
    return RiskRepository.create(data);
  }
  async getAllRisks() {
    return RiskRepository.getAll();
  }
  async getRiskById(id: number) {
    return RiskRepository.getOne(id);
  }

  async updateRisk(id: number, frequency: number) {
    return RiskRepository.update(id, frequency);
  }

  async deleteRisk(id: number) {
    return RiskRepository.delete(id);
  }
}

export default new RiskService();
