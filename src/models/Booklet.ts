export interface Booklet {
  id: number;
  title: string;
  content?: string;
  images?: string; // comma-separated paths or JSON string
  created_at?: string;
}
