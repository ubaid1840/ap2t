import { Calendar, Clock, MapPin, Users } from "lucide-react";


export const values = [
    {
        title: "Excellence",
        description: "We pursue the highest standards in every training experience. We consistently refine our methods, inspire athletes to push their limits, and ensure every session delivers measurable progress."
    },
    {
        title: "Team Development",
        description: "We believe strong individuals build even stronger teams. Our programs focus on collaboration, leadership, and unity—helping players grow together on and off the field."
    },
    {
        title: "Goal-Oriented",
        description: "Every training sesison is desinged with clear outcomes in mind. We set actionable targets, track performance, and help athletes stay focused on achieving real, impactful results. "
    },
    {
        title: "Professionalism",
        description: "We uphold integrity, discipline, and the highest coaching standards. From communication to conduct, we create an environment that reflects respect, responsibility, and top-tier soccer training practices."
    }

]

export const about = [
    { title: "25+", description: "Certified Expert Trainers" },
    { title: "150+", description: "Classes" },
    { title: "200+", description: "Members" },
    { title: "10+", description: "Years" },

]

export const detailIcons = [
    Calendar,
    Clock,
    Users,
    MapPin,
];

export type Camp = {
    badge : string
    title : string
    description : string
    left ?: number
    details : string[]
    eventDetails : string
    highlights : string[]
    price : number
}

export const camps: Camp[] = [
  {
    badge: "CAMP",
    title: "Summer Soccer Camp 2025",
    description: "Elite week-long training experience",
    price: 349,
    eventDetails:
      "An intensive summer camp focused on developing technical skills, tactical awareness, and confidence on the field. Perfect for players looking to elevate their overall game in a competitive environment.",
    highlights: [
      "Professional coaching staff",
      "Daily technical & tactical sessions",
      "Small group training for individual attention",
      "Fitness and conditioning drills",
      "Game-based learning activities",
      "Indoor climate-controlled facility",
      "Skill assessment and feedback",
      "Fun, competitive environment"
    ],
    details: [
      "July 14-18, 2025",
      "9:00 AM - 3:00 PM",
      "Ages 6-16",
      "AP2T Indoor facility"
    ]
  },

  {
    badge: "CLINIC",
    title: "Goalkeeper Spring Clinic",
    description: "Specialized goalkeeper training intensive",
    left: 8,
    price: 129,
    eventDetails:
      "A focused clinic designed exclusively for goalkeepers, covering modern techniques, positioning, and decision-making under pressure.",
    highlights: [
      "Position-specific goalkeeper training",
      "Shot-stopping and diving techniques",
      "1v1 and breakaway scenarios",
      "Footwork and distribution drills",
      "Reaction and reflex training",
      "Small goalkeeper groups",
      "Experienced GK coaches",
      "Match-realistic exercises"
    ],
    details: [
      "April 5-6, 2025",
      "10:00 AM - 2:00 PM",
      "Ages 8-18",
      "AP2T Indoor facility"
    ]
  },

  {
    badge: "CLINIC",
    title: "Speed & Agility Clinic",
    description: "Become faster and more explosive",
    left: 15,
    price: 99,
    eventDetails:
      "Designed to improve acceleration, balance, and quick direction changes through structured speed and agility training.",
    highlights: [
      "Sprint mechanics training",
      "Agility ladder drills",
      "Change-of-direction exercises",
      "Explosive power development",
      "Speed endurance sessions",
      "Injury prevention techniques",
      "Performance-focused coaching",
      "Applicable to all positions"
    ],
    details: [
      "May 17, 2025",
      "9:00 AM - 1:00 PM",
      "Ages 10+",
      "AP2T Indoor facility"
    ]
  },

  {
    badge: "CLINIC",
    title: "Finishing & Shooting Clinic",
    description: "Master the art of scoring goals",
    left: 12,
    price: 109,
    eventDetails:
      "A high-intensity clinic focused on improving shooting accuracy, finishing techniques, and goal-scoring confidence.",
    highlights: [
      "Shooting technique refinement",
      "Finishing from different angles",
      "One-touch and quick-release shots",
      "Weak foot development",
      "Game-like scoring scenarios",
      "Attacking movement drills",
      "Confidence-building exercises",
      "Coaching feedback & correction"
    ],
    details: [
      "June 8, 2025",
      "5:00 PM - 8:00 PM",
      "Ages 12+",
      "AP2T Indoor facility"
    ]
  },

  {
    badge: "CAMP",
    title: "Girls Soccer Development Camp",
    description: "Empowering female soccer players",
    price: 249,
    eventDetails:
      "A dedicated camp for female athletes focused on skill development, teamwork, and confidence-building in a supportive environment.",
    highlights: [
      "Female-focused coaching approach",
      "Technical and tactical training",
      "Confidence and leadership building",
      "Small-sided competitive games",
      "Teamwork and communication drills",
      "Positive and inclusive atmosphere",
      "Skill progression tracking",
      "Fun and empowering sessions"
    ],
    details: [
      "August 4-6, 2025",
      "9:00 AM - 2:00 PM",
      "Ages 8-16",
      "AP2T Indoor facility"
    ]
  },

  {
    badge: "CLINIC",
    title: "Dribbling & 1v1 Moves Clinic",
    description: "Beat defenders with confidence",
    left: 10,
    price: 99,
    eventDetails:
      "This clinic emphasizes ball control, creativity, and confidence in 1v1 situations against defenders.",
    highlights: [
      "Advanced ball mastery drills",
      "1v1 attacking techniques",
      "Change of pace and direction",
      "Creative move combinations",
      "Game-realistic duels",
      "Decision-making under pressure",
      "Confidence-focused coaching",
      "All-skill-level friendly"
    ],
    details: [
      "March 22, 2025",
      "4:00 PM - 7:00 PM",
      "Ages 8+",
      "AP2T Indoor facility"
    ]
  },

  {
    badge: "CAMP",
    title: "Spring Break Mini Camp",
    description: "Stay sharp during school break",
    price: 179,
    eventDetails:
      "A short and energetic camp designed to keep players active, sharp, and improving during the spring break period.",
    highlights: [
      "Daily skill development sessions",
      "Fun game-based learning",
      "Light fitness and movement drills",
      "Small-sided matches",
      "Skill challenges and competitions",
      "Positive learning environment",
      "Indoor facility comfort",
      "Balanced training and fun"
    ],
    details: [
      "April 21-23, 2025",
      "9:00 AM - 12:00 PM",
      "Ages 6-14",
      "AP2T Indoor facility"
    ]
  },

  {
    badge: "CAMP",
    title: "High School Pre Camp",
    description: "Prepare for the next level",
    price: 299,
    eventDetails:
      "A high-performance camp aimed at preparing high school players physically and tactically for competitive seasons.",
    highlights: [
      "Advanced tactical training",
      "High-intensity fitness sessions",
      "Position-specific coaching",
      "Match preparation strategies",
      "Leadership and mindset development",
      "College-style training environment",
      "Performance feedback sessions",
      "Competitive match play"
    ],
    details: [
      "August 18-22, 2025",
      "1:00 PM - 5:00 PM",
      "Ages 13-18",
      "AP2T Indoor facility"
    ]
  }
]
