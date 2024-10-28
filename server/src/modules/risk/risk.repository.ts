import { Prisma } from "@prisma/client";
import prisma from "../../database/prisma";

class RiskRepository {
  private readonly prisma;
  constructor() {
    this.prisma = prisma
  }

  async create(risk: Prisma.RiskCreateInput) {
    return await this.prisma.risk.create({ data: risk });
  }

  async getAll() {
    return await this.prisma.risk.findMany({
      include: {
        risk_type: true,
        threat: true,
        asset_type: true,
        vulnerability: true,
      },
    });
  }
  async getById(id: number) {
    return await this.prisma.risk.findUnique({
      where: { id },
      include: {
        risk_type: true,
        threat: true,
        asset_type: true,
        vulnerability: true,
      },
    });
  }

  async update(id: number, risk: Prisma.RiskUpdateInput) {
    return await this.prisma.risk.update({ where: { id }, data: risk });
  }

  async delete(id: number) {
    return await this.prisma.risk.delete({ where: { id } });
  }
}

export default RiskRepository;
