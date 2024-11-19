export interface ActionPlan {
    id?: number;
    residual_risk: string;
    treatment: string;
    action_plan: string;
    responsible: string;
    implementation_date: string | null;
    control_tracking: string;
    state: string;
    monitoring: string;
    monitoring_date: string | null;
    indicator: string;
    risk_id: number;
  }
  