export interface ControlDTO {
  code: number;
  description_iso: string;
  description_city_hall: string;
}

export interface UpdateControlDTO {
  description_iso?: string;
  description_city_hall?: string;
}
