import { Threat } from "@/app/interfaces/riskInterface";
import axios from "axios";

export const getAllThreats = async () => {
  const res = await axios.get("http://localhost:3000/api/threats");

  return res.data;
};

export const createThreat = async (data: Threat) => {
  try {
    const res = await axios.post("http://localhost:3000/api/threats", data);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};
