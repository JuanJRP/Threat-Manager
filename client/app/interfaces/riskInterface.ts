export interface Risk {
    id: number
    frequency: number
    penalty: number
    inherent_probability: string
    probability_percentage: number
    inherent_impact: string
    impact_percentage: number
    inherent_risk: string
    control_type: string
    implementation: string
    control_qualification: number
    residual_probability: string
    residual_impact: string
    final_risk: string
    risk_type_id: number
    threat_id: number
    asset_type_id: number
    vulnerability_id: number
    user_id: number
    risk_type: RiskType
    threat: Threat
    asset_type: AssetType
    vulnerability: Vulnerability
  }

  export interface CreateRisk {
    frequency: number
    penalty: number
    risk_type_id: number
    threat_id: number
    asset_type_id: number
    vulnerability_id: number
    user_id: number
  }
  
  export interface RiskType {
    id: number
    name: string
    avaiability: boolean
    confidentiality: boolean
    integrity: boolean
  }
  
  export interface Threat {
    id?: number
    name: string
    description?: string
  }
  
  export interface AssetType {
    id: number
    name: string
    description: string
    category: string
  }
  
  export interface Vulnerability {
    id: number
    control_code: number
    name: string
    description: string
  }
  