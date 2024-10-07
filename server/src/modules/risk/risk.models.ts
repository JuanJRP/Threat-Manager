interface Risk {
  risk_type_id: number;
  frequency?: number | null;
  threat_id: number;
  asset_type_id: number;
  vulnerability_id: number;
}

export default Risk;
