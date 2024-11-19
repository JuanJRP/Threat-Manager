import { Prisma } from "@prisma/client";
import prisma from "../../database/prisma";
import { ControlDTO, UpdateControlDTO } from "./control.models";

export class ControlRepository {
  async createControl(control: Prisma.ControlCreateInput) {
    return prisma.control.create({ data: control });
  }

  async getAllControls() {
    return prisma.control.findMany({
      include: { vulnerability: true }, // Include vulnerabilities
    });
  }

  async getControlById(id: number) {
    return prisma.control.findUnique({
      where: { id },
      include: { vulnerability: true }, // Include vulnerabilities
    });
  }

  async getControlByCode(code: number) {
    return prisma.control.findUnique({
      where: { code },
      include: { vulnerability: true }, // Include vulnerabilities
    });
  }

  async updateControlById(id: number, data: Prisma.ControlUpdateInput) {
    return prisma.control.update({
      where: { id },
      data,
    });
  }

  async deleteControlById(id: number) {
    return prisma.control.delete({
      where: { id },
    });
  }
}
