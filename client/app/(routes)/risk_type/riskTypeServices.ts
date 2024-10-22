import axios from "axios";

export const getAllRiskTypes = async () => {
  const res = await axios.get("http://localhost:3000/api/risk_type");

  return res.data;
};
