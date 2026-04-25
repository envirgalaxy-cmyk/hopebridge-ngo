import type { VolunteerOpportunity } from "../types";

export const volunteerOpportunities: VolunteerOpportunity[] = [
  {
    id: "field-coordinator",
    role: "Field Program Coordinator",
    category: "Program Management",
    location: "Uganda (On-site, 6-month placement)",
    commitment: "Full-time, 6 months",
    description:
      "Lead day-to-day operations of our education programs in rural Uganda. Coordinate with local teachers, manage supply logistics, and report progress to our global team.",
    skills: [
      "Project management",
      "Swahili or Luganda (basic)",
      "Community engagement",
      "Data reporting",
    ],
    spotsAvailable: 2,
    icon: "🌍",
  },
  {
    id: "digital-marketing",
    role: "Digital Marketing Volunteer",
    category: "Communications",
    location: "Remote (Global)",
    commitment: "10 hrs/week, 3 months",
    description:
      "Help us reach more donors and supporters through compelling social media content, email campaigns, and storytelling that brings our mission to life online.",
    skills: [
      "Social media management",
      "Copywriting",
      "Canva or Adobe tools",
      "Email marketing",
    ],
    spotsAvailable: 3,
    icon: "📱",
  },
  {
    id: "medical-volunteer",
    role: "Medical Officer / Volunteer Doctor",
    category: "Healthcare",
    location: "Bangladesh (On-site, 2-month rotation)",
    commitment: "Full-time, 2-month rotation",
    description:
      "Join our mobile clinic teams providing free healthcare to remote villages in Bangladesh. General practitioners, nurses, and specialists are all welcome.",
    skills: [
      "Medical license (any country)",
      "Emergency care",
      "Maternal health experience a plus",
      "Adaptability",
    ],
    spotsAvailable: 4,
    icon: "🩺",
  },
  {
    id: "grant-writer",
    role: "Grant Writer",
    category: "Fundraising",
    location: "Remote (Global)",
    commitment: "15 hrs/week, ongoing",
    description:
      "Research institutional funding opportunities and craft compelling grant proposals to secure major funding from foundations, governments, and corporations.",
    skills: [
      "Grant writing experience",
      "Research skills",
      "Persuasive writing",
      "Knowledge of NGO sector",
    ],
    spotsAvailable: 1,
    icon: "✍️",
  },
  {
    id: "water-engineer",
    role: "Water & Sanitation Engineer",
    category: "Technical",
    location: "Ethiopia (On-site, 3-month placement)",
    commitment: "Full-time, 3 months",
    description:
      "Design, oversee, and commission freshwater well systems and solar-powered filtration units in rural Ethiopian communities. Train local maintenance teams.",
    skills: [
      "Civil or environmental engineering",
      "Hydrogeology basics",
      "Community training",
      "AutoCAD or similar",
    ],
    spotsAvailable: 2,
    icon: "💧",
  },
  {
    id: "community-educator",
    role: "Community Health Educator",
    category: "Healthcare",
    location: "Myanmar (On-site, 4-month placement)",
    commitment: "Full-time, 4 months",
    description:
      "Deliver health literacy workshops in rural communities — covering nutrition, hygiene, disease prevention, and maternal care — working alongside our local health workers.",
    skills: [
      "Public health background",
      "Workshop facilitation",
      "Cross-cultural communication",
      "Burmese language a plus",
    ],
    spotsAvailable: 3,
    icon: "🏥",
  },
];
