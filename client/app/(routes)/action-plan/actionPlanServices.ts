import axios from "axios";
import { ActionPlan } from "./components/interface";

export const getAllActionPlan = async () => {
  const res = await axios.get("http://localhost:3001/api/action_plans");
  const { actionPlans } = res.data;
  return actionPlans;
};
export const CreateActionPlan = async (actionPlan:ActionPlan) => {
  const res = await axios.post(`http://localhost:3001/api/action_plans`,actionPlan);
  const { actionPlans } = res.data;
  return actionPlans;
};

export const EditActionPlanById = async ( id:string, data:ActionPlan) => {
  const res = await axios.put(`http://localhost:3001/api/action_plans/${id}`,data);
  const { actionPlans } = res.data;
  return actionPlans;
};

export const DeleteActionPlanById = async (id: string) => {
  const res = await axios.delete(`http://localhost:3001/api/action_plans/${id}`);
  const { actionPlans } = res.data;
  return actionPlans;
};

