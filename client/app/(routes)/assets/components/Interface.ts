export interface Asset {
  id: string;
  [key: string]: any;
}

export interface Column {
  key: string;
  label: string;
  visible: boolean;
}
