import { Threat } from "@/app/interfaces/riskInterface";
import { SERVER_URL } from "@/app/utils/envFiles";
import axios from "axios";

export const getAllThreats = async () => {
  const res = await axios.get(`${SERVER_URL}/threats`);

  return res.data;
};

export const createThreat = async (data: Threat) => {
  try {
    const res = await axios.post(`${SERVER_URL}/threats`,data);

    return res.data;
  } catch (error) {
    throw error;
  }
};
