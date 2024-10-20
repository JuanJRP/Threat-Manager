import { CreateRisk } from "@/app/interfaces/riskInterface";
import axios from "axios";

export const getAllRisks = async () => {
  const res = await axios.get("http://localhost:3000/api/risks");

  const { risks } = res.data;
  return risks;
};

export const getRiskById = async (id: string) => {
  const res = await axios.get(`http://localhost:3000/api/risks/${id}`);

  const { risk } = res.data;
  return risk;
};

export const createRisk = async (risk: CreateRisk) => {
  try {
    const res = await axios.post("http://localhost:3000/api/risks", risk);
    return res.data;
  } catch (error) {
    throw error;
  }
};
