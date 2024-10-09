import { ThreathRepository } from './threats.repository';
import { ThreathDTO } from './threats.models';

class ThreathService {
  private ThreathRepository = new ThreathRepository();

  async createThreath(threath: ThreathDTO) {
    return this.ThreathRepository.createThreath(threath);
  }

  async getAllThreath() {
    return this.ThreathRepository.getAllThreaths();
  }

  async GetThreathById(id: number) {
    return this.ThreathRepository.GetThreathById(id);
  }

  async GetThreathByName(name: string) {
    return this.ThreathRepository.GetThreathByName(name);
  }

  async UpdateThreathById(id: number, data: Partial<ThreathDTO>) {
    return this.ThreathRepository.UpdateThreathById(id, data);
  }

  async DeleteThreathById(id: number) {
    return this.ThreathRepository.DeleteThreathById(id);
  }

  async DeleteManyThreathById(array: number[]): Promise<void> {
    await Promise.all(
      array.map(async (id) => {
        try {
          await this.ThreathRepository.DeleteThreathById(id);
        } catch (err) {
          console.error(`Error deleting asset with id ${id}`);
        }
      })
    );
  }
}

export default new ThreathService();
