export interface Equipment {
  id: number;
  name: string;
  description?: string;
  daily_rate: number;
  quantity: number;
  created_at?: string;
}
