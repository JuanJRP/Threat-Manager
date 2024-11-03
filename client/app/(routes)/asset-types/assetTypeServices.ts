import { SERVER_URL } from "@/app/utils/envFiles";
import axios from "axios";

export const getAllAssetTypes = async () => {
  const res = await axios.get(`${SERVER_URL}/assets_type`);

  return res.data;
};
