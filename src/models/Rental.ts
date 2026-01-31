export interface Rental {
  id: number;
  user_id: number;
  equipment_id: number;
  quantity: number;
  start_date: string;
  end_date: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  created_at?: string;
}
