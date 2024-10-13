import type { Prisma } from "@prisma/client";
import prisma from "../../database/prisma";
import Action_plan from "./action_plan.models";
import Action_planDTO from "./action_plan.models";

class ActionPlanRepository {
  private readonly prisma;
  constructor() {
    this.prisma = prisma;
  }

  async getAll() {
    return await this.prisma.action_plan.findMany();
  }

  async getById(id: number) {
    return await this.prisma.action_plan.findUnique({ where: { id } });
  }

  async getByKey(
    key: keyof Prisma.Action_planWhereInput,
    value: Prisma.Action_planWhereInput[keyof Prisma.Action_planWhereInput]
  ) {
    return await this.prisma.action_plan.findFirst({ where: { [key]: value } });
  }

  async create(action_plan: Action_planDTO) {
    return await this.prisma.action_plan.create({ data: action_plan });
  }

  async update(id: number, action_plan: Partial<Action_planDTO>) {
    return await this.prisma.action_plan.update({ where: { id }, data: action_plan });
  }

  async delete(id: number) {
    return await this.prisma.action_plan.delete({ where: { id } });
  }
}

export default ActionPlanRepository;