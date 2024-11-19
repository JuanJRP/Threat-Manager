import axios from "axios";
import { AssetType } from "./components/interface";

export const getAllAssetTypes = async () => {
  const res = await axios.get("http://localhost:3001/api/assets_type");
  const assetTypes = res.data;
  return assetTypes;
};

export const CreateAssetTypes = async (assetType: AssetType) => {
  const res = await axios.post(
    `http://localhost:3001/api/assets_type`,
    assetType
  );
  const { assetTypes } = res.data;
  return assetTypes;
};

export const EditAssetTypesById = async (id: string, data: AssetType) => {
  const res = await axios.put(
    `http://localhost:3001/api/assets_type/${id}`,
    data
  );
  const { assetTypes } = res.data;
  return assetTypes;
};

export const DeleteAssetTypesById = async (id: string) => {
  const res = await axios.delete(`http://localhost:3001/api/assets_type/${id}`);
  const { assetTypes } = res.data;
  return assetTypes;
};
