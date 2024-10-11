import type { Prisma } from "@prisma/client";
import prisma from "../../database/prisma";
import User from "./user.model";

class UserRepository {
  private readonly prisma;
  constructor() {
    this.prisma = prisma;
  }

  async getAll() {
    return await this.prisma.user.findMany();
  }

  async getById(id: number) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async getByKey(
    key: keyof Prisma.UserWhereInput,
    value: Prisma.UserWhereInput[keyof Prisma.UserWhereInput]
  ) {
    return await this.prisma.user.findFirst({ where: { [key]: value } });
  }

  async create(user: Prisma.UserCreateInput) {
    return await this.prisma.user.create({ data: user });
  }

  async update(id: number, user: Prisma.UserUpdateInput) {
    return await this.prisma.user.update({ where: { id }, data: user });
  }

  async delete(id: number) {
    return await this.prisma.user.delete({ where: { id } });
  }
}

export default UserRepository;
