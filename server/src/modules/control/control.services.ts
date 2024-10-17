import { ControlRepository } from "./control.repository";
import { ControlDTO, UpdateControlDTO } from "./control.models";

class ControlService {
  private controlRepository = new ControlRepository();

  async createControl(control: ControlDTO) {
    return this.controlRepository.createControl(control);
  }

  async getAllControls() {
    return this.controlRepository.getAllControls();
  }

  async getControlById(id: number) {
    return this.controlRepository.getControlById(id);
  }

  async getControlByCode(code: number) {
    return this.controlRepository.getControlByCode(code);
  }

  async updateControlById(id: number, data: UpdateControlDTO) {
    return this.controlRepository.updateControlById(id, data);
  }

  async deleteControlById(id: number) {
    return this.controlRepository.deleteControlById(id);
  }
}

export default new ControlService();
