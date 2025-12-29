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

export const team = [
  {
    img: "/about/Rj.jpg",
    title: "RJ Allen",
    designation: "Director of Training",
    email: "rjallen@ap2t.net",
    description: `RJ Allen is the Director of Training and joined AP2T as a full time owner in 2019.  RJ comes to AP2T with a wealth of professional playing experience in Europe and in the MLS.


RJ had a decorated 4 year MLS career playing for NYCFC, Orlando City, and Philadelphia Union.  During his tenure at NYCFC, RJ was twice named to the MLS Team of the Week, and earned FIFA Team of the week honors.  He had the opportunity to play alongside all-time greats Frank Lampard, Andrea Pirlo, David Villa, Kaka, and Nani.


RJ utilizes his playing experience at the highest level to train and mentor his athletes in all facets of the game.  His big game experience is especially valuable for the psychological, technical, and tactical development of his athletes.


RJ attended Monmouth University where he was named an NSCAA All-American.  He attended Saint Joseph High school in Metuchen where he was recently inducted to their hall of fame.  He currently holds his USSF National D license and has collegiate coaching experience with the College of Staten Island.`
  },
  {
    img: "/about/Zach.jpg",
    title: "Zach Rauch",
    designation: "Director of Strength & Conditioning",
    email: "zach@ap2t.net",
    description: `Certifications: Certified Strength and Conditioning Specialist (NSCA), USA Weightlifting Coach (USAW), Certified Nutrition Coach (NASM), Functional Movement Screen Certified (FSM)


Education: Elon University-B.S. Exercise Science 2015`
  },
  {
    img: "/about/Matt.jpg",
    title: "Matt Nigro",
    designation: "Technical Director",
    email: "matt@ap2t.net",
    description: `Matt Nigro is the Technical Director and joined AP2T as a full time owner in 2019.  Matt joins AP2T following an extensive professional playing career in Iceland and domestically.


Matt is responsible for the technical development and programming for many of the top professional, collegiate, and youth athletes in the country.  His extensive client list includes those that play in Europe, Mexico, South America, and the NWSL, MLS, and USL.


As a member of FC Motown of the NPSL, Matt was named First Team All-Conference, Region, and National XI.  He also was named the NPSL’s Golden Ball Winner.  He also played with IF Vestri (Iceland), Phoenix Rising, New York Red Bulls II, and Harrisburg City Islanders.  During his playing career, Matt had the opportunity to play alongside legendary players Didier Drogba and Shaun Wright-Phillips.


An experienced coach, Matt served on staff with the William Paterson Women’s soccer team.  A alumni of the men’s program, Matt was named CAC Men's Soccer Metro Region First Team, All-NJAC First Team and NSCAA All-South Atlantic Region Third Team.


Education: Studied Exercise Science at William Paterson University. Bachelor’s Degree


Professional Playing Experience: FC Motown NPSL,Named the first team All Conference, First team All Region, First team All Nation XI. Named NPSL’s Golden Ball Winner. 

IF Vestri, Phoenix Rising, New York Red Bulls II, Harrisburg City Islanders


William Paterson University Men’s Soccer: 2010-2013: Named the 2013 ECAC Men's Soccer Metro Region First Team, All-NJAC First Team and NSCAA All-South Atlantic Region Third Team.`
  },
  {
    img: "/about/Mike.jpg",
    title: "Mike Olim",
    designation: "Founder / Director of Operations",
    email: "mike@ap2t.net",
    description: `Mike Olim is the Founder and Director of Operations of Advanced Physical and Technical Training (AP2T). Mike originally started the company in 2008 and over the past 12 years has helped build it into one of the largest soccer specific athletic performance and technical training companies in the country.   


Mike has been responsible for the training protocol for thousands of athletes through his tenure as owner and director of AP2T and many have gone on to play at the highest levels of the game.  This includes the World Cup, Olympics, NWSL, MLS, Serie A, and numerous other professional leagues.  Most recently Mike served as the Strength and Conditioning coach for the Rutgers University Women's Soccer team (NCAA Division I, Big 10 Conference).  During his tenure at Rutgers, the Scarlet Knights reached a top 15 NCAA National Ranking, finished 2nd in the Big 10 regular season, and earned a top 5 sectional seed in the NCAA Tournament. 


Mike and the AP2T staff have been responsible for the club wide strength and conditioning programming for some of the best male and female soccer programs in the country.  These include PDA (Zarephath and Hibernian), Cedar Stars Academy Monmouth, and PSA. 


An accomplished youth soccer coach, Olim worked alongside Coach Jeff Josell for the Metuchen Rover Juniors (boys) and SPF United (girls).  The Metuchen Rover Juniors won 2 State Cup, 1 Regional, and 1 National Championship and ranked as high as number 5 in the country.  SPF United reached similar heights, capturing 1 State Cup and ranked as high as number 8 in the country.  Additionally, Olim and Josell have coached both men’s and women’s summer teams that compete in the EDP Super League.`
  },
]


