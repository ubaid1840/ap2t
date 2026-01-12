export const PLAYERS_DATA = [
  {
    id: 1,
    name: "James Smith",
    coach_name: "Michael Johnson",
    age: 16,
    position: "Forward",
    parent: "Robert Smith",
    joining_date: "2025-08-12",
    last_session: "Dribbling & Shooting",
    last_session_date: "2026-01-07",
    attendance: 94,
  },
  {
    id: 2,
    name: "Emily Davis",
    coach_name: "Michael Johnson",
    age: 15,
    position: "Defender",
    parent: "Laura Davis",
    joining_date: "2025-09-03",
    last_session: "Defensive Tactics",
    last_session_date: "2026-01-06",
    attendance: 89,
  },
  {
    id: 3,
    name: "William Brown",
    coach_name: "Sarah Wilson",
    age: 17,
    position: "GoalKeeper",
    parent: "Thomas Brown",
    joining_date: "2025-07-18",
    last_session: "Goalkeeping Drills",
    last_session_date: "2026-01-08",
    attendance: 100,
  },
  {
    id: 4,
    name: "Olivia Miller",
    coach_name: "Sarah Wilson",
    age: 16,
    position: "Forward",
    parent: "Mary Miller",
    joining_date: "2025-10-01",
    last_session: "Shooting Accuracy",
    last_session_date: "2026-01-05",
    attendance: 94,
  },
  {
    id: 5,
    name: "Ethan Anderson",
    coach_name: "Michael Johnson",
    age: 16,
    position: "Defender",
    parent: "John Anderson",
    joining_date: "2025-08-25",
    last_session: "Tackling & Marking",
    last_session_date: "2026-01-07",
    attendance: 89,
  },
  {
    id: 6,
    name: "Sophia Taylor",
    coach_name: "Sarah Wilson",
    age: 15,
    position: "GoalKeeper",
    parent: "Patricia Taylor",
    joining_date: "2025-09-15",
    last_session: "Reaction Speed Training",
    last_session_date: "2026-01-06",
    attendance: 100,
  },
  {
    id: 7,
    name: "Benjamin Moore",
    coach_name: "Michael Johnson",
    age: 17,
    position: "Forward",
    parent: "Daniel Moore",
    joining_date: "2025-07-30",
    last_session: "Shooting & Passing",
    last_session_date: "2026-01-08",
    attendance: 94,
  },
  {
    id: 8,
    name: "Ava Thomas",
    coach_name: "Sarah Wilson",
    age: 16,
    position: "Defender",
    parent: "Elizabeth Thomas",
    joining_date: "2025-10-10",
    last_session: "Marking & Positioning",
    last_session_date: "2026-01-07",
    attendance: 89,
  },
  {
    id: 9,
    name: "Liam Jackson",
    coach_name: "Michael Johnson",
    age: 15,
    position: "GoalKeeper",
    parent: "Charles Jackson",
    joining_date: "2025-08-05",
    last_session: "Shot Stopping Practice",
    last_session_date: "2026-01-05",
    attendance: 100,
  },
  {
    id: 10,
    name: "Isabella White",
    coach_name: "Sarah Wilson",
    age: 16,
    position: "Forward",
    parent: "Jennifer White",
    joining_date: "2025-09-20",
    last_session: "Dribbling & Finishing",
    last_session_date: "2026-01-06",
    attendance: 94,
  },
]






export const PLAYER_TABLE_HEADER = [
    {
        value: "name",
        label: "Player Name",
    },
    {
        value: "age",
        label: "Age",
    },
    {
        value: "position",
        label: "Position",
    },
    {
        value: "parent",
        label: "Parent",
    },
    {
        value: "last_session_date",
        label: "Last Session",
    },
    {
        value: "attendance",
        label: "Attendance",
    },

];

export const CHECKINS_12WEEKS_DATA = [
  { time: "W1", checkins: 42 },
  { time: "W2", checkins: 55 },
  { time: "W3", checkins: 38 },
  { time: "W4", checkins: 61 },
  { time: "W5", checkins: 49 },
  { time: "W6", checkins: 72 },
  { time: "W7", checkins: 65 },
  { time: "W8", checkins: 58 },
  { time: "W9", checkins: 47 },
  { time: "W10", checkins: 70 },
  { time: "W11", checkins: 52 },
  { time: "W12", checkins: 60 },
]

export const COACH_SESSION_NOTES = [
  {
    coach: "Coach Martinez",
    star: 5,
    date: "2026-01-05",
    session: "Basketball Training",
    note: "Great focus on dribbling and shooting drills."
  },
  {
    coach: "Coach Anderson",
    star: 4,
    date: "2026-01-06",
    session: "Goalkeeper Drills",
    note: "Improved reaction time, needs more work on diving saves."
  },
  {
    coach: "Coach Williams",
    star: 3,
    date: "2026-01-08",
    session: "Defensive Skills",
    note: "Struggled with positioning, but showed effort."
  },
  {
    coach: "Coach Brown",
    star: 5,
    date: "2026-01-10",
    session: "Strength & Conditioning",
    note: "Excellent endurance and energy throughout."
  },
  {
    coach: "Coach Johnson",
    star: 4,
    date: "2026-01-12",
    session: "Team Strategy Session",
    note: "Good communication and understanding of tactics."
  },
  {
    coach: "Coach Martinez",
    star: 5,
    date: "2026-01-14",
    session: "Shooting Practice",
    note: "Perfect form on jump shots, highly consistent."
  },
  {
    coach: "Coach Anderson",
    star: 2,
    date: "2026-01-16",
    session: "Goalkeeper Drills",
    note: "Needs improvement on footwork and positioning."
  },
  {
    coach: "Coach Williams",
    star: 4,
    date: "2026-01-18",
    session: "Defensive Skills",
    note: "Good tackling technique, timing needs work."
  },
  {
    coach: "Coach Brown",
    star: 3,
    date: "2026-01-20",
    session: "Strength & Conditioning",
    note: "Energy dropped midway, focus on stamina."
  },
  {
    coach: "Coach Johnson",
    star: 5,
    date: "2026-01-22",
    session: "Team Strategy Session",
    note: "Excellent understanding of formations and roles."
  }
];


export const SESSIONS_DATA = [
    {
        session: "Basketball Training",
        date: "2026-01-05",
        time: "2:00 PM - 3:30 PM",
        coach: "Coach Martinez",
        payment: "Paid",
        price: 85,
        status: "Attended",
        coach_note: "Focus on dribbling fundamentals",
    },
    {
        session: "Goalkeeper Drills",
        date: "2026-01-06",
        time: "4:00 PM - 5:30 PM",
        coach: "Coach Anderson",
        payment: "Comped",
        price: 0,
        status: "Attended",
    },
    {
        session: "Defensive Skills",
        date: "2026-01-08",
        time: "3:00 PM - 4:30 PM",
        coach: "Coach Williams",
        payment: "Paid",
        price: 150,
        status: "Missed",
        coach_note: "Review defensive positioning next session",
    },
    {
        session: "Strength & Conditioning",
        date: "2026-01-10",
        time: "5:00 PM - 6:00 PM",
        coach: "Coach Brown",
        payment: "Pending",
        price: 70,
        status: "Upcoming",
    },
    {
        session: "Shooting Practice",
        date: "2026-01-12",
        time: "1:30 PM - 3:00 PM",
        coach: "Coach Martinez",
        payment: "Paid",
        price: 55,
        status: "Upcoming",
        coach_note: "Work on 3-point consistency",
    },
    {
        session: "Team Strategy Session",
        date: "2026-01-14",
        time: "6:00 PM - 7:30 PM",
        coach: "Coach Johnson",
        payment: "Pending",
        price: 95,
        status: "Upcoming",
    },
];