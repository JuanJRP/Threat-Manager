
import { ControlDTO } from "@/app/interfaces/controlInterface";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_HOST;

export const getAllControls = async () => {
  const res = await axios.get(`${SERVER_URL}/control`);
  const Controls  = res.data;
  return Controls;
};

export const createControl = async (Control: ControlDTO) => {
  try {
    const res = await axios.post(`${SERVER_URL}/control`, Control);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateControl = async (id: string, Control: ControlDTO) => {
  try {
    const res = await axios.put(`${SERVER_URL}/control/${id}`, Control);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteControl = async (id: string) => {
  try {
    const res = await axios.delete(`${SERVER_URL}/control/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const useControls = () => {
  return useQuery({
    queryKey: ["Control"],
    queryFn: async () => getAllControls(),
  });
};
