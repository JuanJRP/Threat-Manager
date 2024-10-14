import type { Prisma } from "@prisma/client";
import ActionPlanRepository from "./action_plan.repository";
import { HttpException } from "../../utils/HttpExceptions";
import Action_planDTO from "./action_plan.models";

const actionPlanRepository = new ActionPlanRepository();

class ActionPlanService {
  private readonly actionPlanRepository: ActionPlanRepository;
  constructor() {
    this.actionPlanRepository = actionPlanRepository;
  }

  async getAll() {
    return await this.actionPlanRepository.getAll();
  }

  async getById(id: number) {
    const user = await this.actionPlanRepository.getById(id);
    if (!user) throw new HttpException(404, "User not found");
    return user;
  }

  async getByKey(
    key: keyof Prisma.Action_planWhereInput,
    value: Prisma.Action_planWhereInput[keyof Prisma.Action_planWhereInput]
  ) {                                     
    return await this.actionPlanRepository.getByKey(key, value);
  }
                                                                                      
  async create(action_plan: Action_planDTO) {               
    return await this.actionPlanRepository.create(action_plan);
  }

  async update(id: number, action_plan: Partial<Action_planDTO>) {
    await this.getById(id);
    return await this.actionPlanRepository.update(id, action_plan);
  }

  async delete(id: number) {
    await this.getById(id);
    await this.actionPlanRepository.delete(id);
  }
}

export default ActionPlanService;
