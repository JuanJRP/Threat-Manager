interface Action_planDTO{
    residual_risk: string;
    treatment: string;
    action_plan: string;
    responsible: string;
    implementation_date: Date;
    control_tracking: string;
    state: ActionPlanState; // Pendiente, En proceso, Finalizado ENUM
    monitoring: string;
    monitoring_date: Date;
    indicator: string;
    risk_id: number;
}

enum ActionPlanState {
    Pending = 'Pendiente',
    InProgress = 'En proceso',
    Finished = 'Finalizado'
}

export default Action_planDTO
