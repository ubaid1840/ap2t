import { Moment } from "moment"

export type CalendarEvent = {
  id: string
  title: string
  date: string 
  type: 'active' | 'info' | 'warning' | 'danger'
  time : string
  sessionType : string
  status : string
  children : {user_id : number, last_name : string, first_name : string}[]
  enrolled : boolean
  start_date: string | null
  end_date : string | null
  end_time : string
  originalId : string
}

export type CustomCalendarProps = {
 events?: CalendarEvent[], 
 player_id: string | null | undefined, 
 onSuccess: () => Promise<void>, 
 parent_id: string | null | undefined | number, 
 loading?: boolean, 
 currentMonth : Moment, 
 setCurrentMonth : (item : any)=> void
}

export interface SessionDataType {
  id: string;
  sessionName: string;
  type: string;
  date: string;
  time: string;
  coachName: string;
  playerName: string;
  price: string;
  payment: string;
  status: string;
  max_players?: number;
  location?: string;
  promotion_price ?: string;
  comped : boolean
}

export interface Event {
  title: string;
  date: string; 
  time: string; 
  status: "Available" | "Booked" | "Blocked" | string;
}

export interface WeeklyScheduleProps {
  events: Event[];
  id : string | null
  preference : Record<string, string> | null | undefined
}



export interface CoachResponse {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  status: string;
  picture: string | null;
  location: string | null;
  phone_no: string | null;
  joining_date: string | null;
  birth_date: string | null;
  created_at: string;

  profile: CoachProfile;

  session_data: SessionDataCoach[];
  payment_data: PaymentDataCoach[];
  this_month_revenue: string
  last_month_revenue: string
  average_price_per_session: string
  total_revenue: string
}

export interface CoachProfile {
  id: number;
  bio: string | null;
  rating: number | null;
  user_id: number;
  created_at: string;
  career_start: string | null;

  specialities: string[];
  certifications: string[];

  schedule_preference: Record<string, string> | null;
}

export interface SessionDataCoach {
  id: number;
  name: string;
  description: string;
  status: string;
  session_type: string;
  coach_id: number;
  location: string;

  start_time: string;
  end_time: string;
  date: string;
  end_date: string;

  price: number;
  promotion_price: number;

  max_players: number;
  apply_promotion: boolean;
  show_storefront: boolean;

  image: string;

  created_at: string;
  payment_detail: {
    amount: number
    created_at: string
    id: number
    method: string | null
    paid_at: string | Date | null
    session_id: number
    status: string
    transaction_id: string | null
    user_id: number
  }[]
}

export interface PaymentDataCoach {
  id: number;
  session_id: number;
  user_id: number;
  amount: number;
  status: string;
  created_at: string;
}
