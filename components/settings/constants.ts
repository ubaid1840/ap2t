export const PLAYER_ATTENDANCE_DATA = [
  {
    name: "James Smith",
    sessions: 12,
    attended: 11,
    missed: 1,
    attendance_rate: 91.7,
  },
  {
    name: "Olivia Johnson",
    sessions: 10,
    attended: 9,
    missed: 1,
    attendance_rate: 90,
  },
  {
    name: "Liam Williams",
    sessions: 15,
    attended: 14,
    missed: 1,
    attendance_rate: 93.3,
  },
  {
    name: "Emma Brown",
    sessions: 8,
    attended: 7,
    missed: 1,
    attendance_rate: 87.5,
  },
  {
    name: "Noah Jones",
    sessions: 14,
    attended: 14,
    missed: 0,
    attendance_rate: 100,
  },
  {
    name: "Ava Miller",
    sessions: 9,
    attended: 8,
    missed: 1,
    attendance_rate: 88.9,
  },
  {
    name: "William Davis",
    sessions: 11,
    attended: 10,
    missed: 1,
    attendance_rate: 90.9,
  },
]


export const SESSION_TYPE_PIE_DATA = [
  {
    name: "Group Session",
    value: 420,
    fill: "var(--chart-1)",
  },
  {
    name: "Private Session",
    value: 310,
    fill: "var(--chart-2)",
  },
  {
    name: "Trial Session",
    value: 180,
    fill: "var(--chart-3)",
  },
  {
    name: "Fitness Session",
    value: 260,
    fill: "var(--chart-4)",
  },
  {
    name: "Goalkeeper Session",
    value: 140,
    fill: "var(--chart-5)",
  },
]

export const SESSION_TYPE_CHART_CONFIG = {
  value: {
    label: "Sessions",
  },
  "Group Session": {
    label: "Group Session",
    color: "var(--chart-1)",
  },
  "Private Session": {
    label: "Private Session",
    color: "var(--chart-2)",
  },
  "Trial Session": {
    label: "Trial Session",
    color: "var(--chart-3)",
  },
  "Fitness Session": {
    label: "Fitness Session",
    color: "var(--chart-4)",
  },
  "Goalkeeper Session": {
    label: "Goalkeeper Session",
    color: "var(--chart-5)",
  },
}

export const MONTHLY_SESSIONS_DATA = [
  { month: "July", value: 18200 },
  { month: "August", value: 19550 },
  { month: "September", value: 21000 },
  { month: "October", value: 22800 },
  { month: "November", value: 24500 },
  { month: "December", value: 26800 },
]

export const MONTHLY_SESSIONS_CONFIG = {
  value: {
    label: "Sessions",
    color: "var(--chart-1)",
  },
}

export const ZIP_REVENUE_DATA = [
  { zip: "10001", players: 25, revenue: 12500, avg_revenue: 500 },
  { zip: "10002", players: 18, revenue: 9800, avg_revenue: 544.44 },
  { zip: "10003", players: 30, revenue: 18000, avg_revenue: 600 },
  { zip: "10004", players: 12, revenue: 7200, avg_revenue: 600 },
  { zip: "10005", players: 20, revenue: 15000, avg_revenue: 750 },
  { zip: "10006", players: 15, revenue: 8250, avg_revenue: 550 },
  { zip: "10007", players: 22, revenue: 13200, avg_revenue: 600 },
]
