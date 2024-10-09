export interface AssetDTO {
    process: string;
    name: string;
    description: string;
    format: string;
    software_version: string;
    manufacturer: string;
    physical_location?: string;
    electronic_location: string;
    responsible: string;
    user_access: string;
    access_date: Date;
    state: boolean;
    entry_date: Date;
    retirement_date: Date;
    availability: boolean;
    integrity: string;
    confidentiality: string;
    asset_type_id: number;
    user_id: number;
}