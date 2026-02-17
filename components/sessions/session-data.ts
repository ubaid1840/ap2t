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


