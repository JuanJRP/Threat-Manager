import  prisma  from '../../database/prisma';
import { ThreathDTO } from './threats.models';

export class ThreathRepository {
  async createThreath(threath: ThreathDTO) {
    return prisma.threath.create({ data: threath});
  }

  async getAllThreaths() {
    return prisma.threath.findMany();
  }

  async GetThreathById(id: number) {
    return prisma.threath.findUnique({ where: { id } });
  }

  async GetThreathByName(name: string) {
    return prisma.threath.findMany({ 
      where: {
        name: {
          equals: name, 
        },
      },
    });
  }

  async UpdateThreathById(id: number, data: Partial<ThreathDTO>) {
    return prisma.threath.update({ where: { id }, data });
  }

  async DeleteThreathById(id: number) {
    return prisma.threath.delete({ where: { id } });
  }
}
