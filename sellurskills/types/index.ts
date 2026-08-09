export type UserRole = "customer" | "provider" | "admin";

export type Profile = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  role: UserRole;
  avatar_url: string | null;
  is_verified: boolean;
  created_at: string;
};

export type BookingStatus =
  | "pending"
  | "accepted"
  | "rejected"
  | "in_progress"
  | "completed"
  | "cancelled";

export type Booking = {
  id: string;
  customer_id: string;
  provider_id: string;
  service_id: string;
  amount: number;
  status: BookingStatus;
  booking_date: string | null;
  start_time: string | null;
  end_time: string | null;
  address: string | null;
  phone: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string | null;
};
