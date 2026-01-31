export interface Farm {
  id: number;
  user_id: number;
  farm_name: string;
  area_hectares: number;
  last_year_income?: number;
  income_status: 'Good' | 'Fair' | 'Poor';
  created_at?: string;
}
