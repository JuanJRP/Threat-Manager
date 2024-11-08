// risk_type.repository.ts
import { RiskTypeDTO } from "./risk_type.models";
import prisma from "../../database/prisma"; // Importa tu instancia de Prisma

export class RiskTypeRepository {
  async createRiskType(riskType: RiskTypeDTO): Promise<RiskTypeDTO> {
    return await prisma.risk_type.create({
      data: riskType,
    });
    
  }

  async getAllRiskTypes(): Promise<RiskTypeDTO[]> {
    return await prisma.risk_type.findMany();
  }

  async getRiskTypeById(id: number): Promise<RiskTypeDTO | null> {
    return await prisma.risk_type.findUnique({
      where: { id },
    });
  }

  async deleteRiskType(id: number): Promise<void> {
    await prisma.risk_type.delete({
      where: { id },
    });
  }
}







