import { create } from "zustand";

export interface Risk {
  id: number
  frequency: number
  penalty: number
  inherent_probability: any
  probability_percentage: any
  inherent_impact: any
  impact_percentage: any
  inherent_risk: any
  control_type: any
  implementation: any
  control_qualification: any
  residual_probability: any
  residual_impact: any
  final_risk: any
  risk_type_id: number
  threat_id: number
  asset_type_id: number
  vulnerability_id: number
  user_id: number
}

interface RiskStore {
  risks: Risk[];
  setRisks: (risks: Risk[]) => void;
}

const useRiskStore = create<RiskStore>((set) => ({
  risks: [],
  setRisks: (risks) => set({ risks }),


}));

export default useRiskStore;
