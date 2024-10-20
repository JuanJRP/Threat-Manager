import axios from "axios";

export const getAllAssets = async () => {
  const res = await axios.get("http://localhost:3000/assets");

  const { assets } = res.data;

  return assets;
};
