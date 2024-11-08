import { SERVER_URL } from "@/app/utils/envFiles";
import axios from "axios";

export const getAllRiskTypes = async () => {
  const res = await axios.get(`${SERVER_URL}/risk_type`);

  return res.data;
};
