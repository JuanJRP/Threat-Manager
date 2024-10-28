import { CreateRisk } from "@/app/interfaces/riskInterface";
import axios from "axios";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_HOST;

export const getAllRisks = async () => {
  const res = await axios.get(`${SERVER_URL}/risks`);
  const { risks } = res.data;
  return risks;
};

export const getRiskById = async (id: string) => {
  const res = await axios.get(`${SERVER_URL}/risks/${id}`);

  const { risk } = res.data;
  return risk;
};

export const createRisk = async (risk: CreateRisk) => {
  try {
    const res = await axios.post(`${SERVER_URL}/risks`, risk);
    return res.data;
  } catch (error) {
    throw error;
  }
};
