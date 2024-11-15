import type { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import UserRepository from "./user.repository";
import { HttpException } from "../../utils/HttpExceptions";
import {
  CreateUserInput,
  UpdateUserInput,
} from "../../validations/UserValidations";

const userRepository = new UserRepository();

class UserService {
  private readonly userRepository: UserRepository;
  constructor() {
    this.userRepository = userRepository;
  }

  async getAll() {
    return await this.userRepository.getAll();
  }

  async getById(id: number) {
    const user = await this.userRepository.getById(id);
    if (!user) throw new HttpException(404, "User not found");
    return user;
  }

  async getByKey(
    key: keyof Prisma.UserWhereInput,
    value: Prisma.UserWhereInput[keyof Prisma.UserWhereInput]
  ) {
    return await this.userRepository.getByKey(key, value);
  }

  async create(user: CreateUserInput) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return await this.userRepository.create({
      ...user,
      password: hashedPassword,
    });
  }

  async update(id: number, user: UpdateUserInput) {
    await this.getById(id);
    if (user.password) user.password = await bcrypt.hash(user.password, 10);
    return await this.userRepository.update(id, user);
  }

  async delete(id: number) {
    await this.getById(id);
    await this.userRepository.delete(id);
  }
}

export default UserService;
