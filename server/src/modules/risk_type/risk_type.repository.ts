import { RiskTypeDTO } from './risk_type.models';
import prisma from '../../database/prisma'; // Importando Prisma

export class RiskTypeRepository {
  
  async createRiskType(riskType: RiskTypeDTO): Promise<RiskTypeDTO> {
    const newRiskType = await prisma.risk_type.create({
      data: riskType,
    });
    return newRiskType;
  }

  async getAllRiskTypes(): Promise<RiskTypeDTO[]> {
    return await prisma.risk_type.findMany();
  }

  async getRiskTypeById(id: number): Promise<RiskTypeDTO | null> {
    return await prisma.risk_type.findUnique({
      where: { id },
    });
  }

  async updateRiskType(id: number, data: Partial<RiskTypeDTO>): Promise<RiskTypeDTO | null> {
    const updatedRiskType = await prisma.risk_type.update({
      where: { id },
      data: data,
    });
    return updatedRiskType;
  }

  async deleteRiskType(id: number): Promise<void> {
    await prisma.risk_type.delete({
      where: { id },
    });
  }
}



