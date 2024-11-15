// risk_type.models.ts
export interface RiskTypeDTO {
  name: string;
  integrity: boolean | null;
  confidentiality: boolean | null;
  availability: boolean | null;
}



