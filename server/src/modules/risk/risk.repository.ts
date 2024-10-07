import prisma from "../../database/prisma";
import Risk from "./risk.models";

class RiskRepository {
  async create(risk: Risk) {
    return await prisma.risk.create({ data: risk });
  }

  async getAll() {
    return await prisma.risk.findMany({
      include: {
        risk_type: true,
        threat: true,
        asset_type: true,
        vulnerability: true,
      },
    });
  }
  async getOne(id: number) {
    return await prisma.risk.findUnique({
      where: { id },
      include: {
        risk_type: true,
        threat: true,
        asset_type: true,
        vulnerability: true,
      },
    });
  }

  async update(id: number, frequency: number) {
    return await prisma.risk.update({ where: { id }, data: { frequency } });
  }

  async delete(id: number) {
    return await prisma.risk.delete({ where: { id } });
  }
}

export default new RiskRepository();
