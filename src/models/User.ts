export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'farmer';
  is_approved: boolean;
  created_at?: string;
}
