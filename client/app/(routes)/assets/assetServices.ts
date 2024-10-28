import axios from "axios";

export const getAllAssets = async () => {
  const res = await axios.get("http://localhost:3001/api/assets");
  const { assets } = res.data;
  return assets;
};

export const DeleteAssetById = async (id: string) => {
  const res = await axios.delete(`http://localhost:3001/api/assets/${id}`);
  const { assets } = res.data;
  return assets;
};
