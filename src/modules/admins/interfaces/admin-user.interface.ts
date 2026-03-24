export interface AdminUser {
  id: string;
  phone: string;
  username: string;
  first_name: string | null;
  last_name: string | null;
  role: string;
  user_id: string;
  status: "ACTIVE" | "BLOCKED";
  blocked_at: Date | null;
  created_at: Date;
  is_deleted: boolean;
  updated_at: Date;
}     