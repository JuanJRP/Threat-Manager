import axios from "axios";

export const getAllAssetTypes = async () => {
    const res = await axios.get("http://localhost:3000/api/assets_type");

    return res.data;
}