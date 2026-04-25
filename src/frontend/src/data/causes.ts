import type { Cause } from "../types";

export const causes: Cause[] = [
  {
    id: "bright-futures-education",
    title: "Bright Futures Education Fund",
    category: "education",
    tagline: "Every child deserves a classroom, a teacher, and a future.",
    description:
      "We're building 12 new schools across rural Uganda and Kenya, training 80 local teachers, and providing learning materials to over 3,000 children who currently have no access to formal education.",
    longDescription:
      "In rural Uganda and Kenya, nearly one in three children never sets foot in a classroom. Distance, cost, and lack of infrastructure keep entire generations from unlocking their potential. The Bright Futures Education Fund directly addresses this by constructing 12 permanent school buildings, training and employing local educators, and supplying students with books, uniforms, and meals. Every dollar you give puts a child on the path to a better life.",
    goal: 120000,
    raised: 78400,
    donors: 412,
    daysLeft: 34,
    image: "https://picsum.photos/seed/10/800/500",
    location: "Uganda & Kenya",
    impact: [
      "12 schools constructed",
      "80 teachers trained",
      "3,000+ students enrolled",
      "Free daily meals provided",
    ],
    featured: true,
  },
  {
    id: "green-earth-reforestation",
    title: "Green Earth Reforestation",
    category: "environment",
    tagline: "Plant a tree today. Breathe easier tomorrow.",
    description:
      "Our teams in Indonesia and Brazil are replanting 500,000 trees across degraded land, restoring biodiversity corridors, and training 200 local families in sustainable agroforestry.",
    longDescription:
      "Deforestation destroys livelihoods, destabilizes climates, and silences ecosystems. Our reforestation initiative combines satellite-guided planting with deep community involvement. We employ local families as forest stewards, pay fair wages, and share the long-term economic rewards of healthy forests — from carbon credits to sustainable timber and fruit harvests.",
    goal: 95000,
    raised: 61250,
    donors: 289,
    daysLeft: 52,
    image: "https://picsum.photos/seed/20/800/500",
    location: "Indonesia & Brazil",
    impact: [
      "500,000 trees planted",
      "200 families trained",
      "4,000 hectares restored",
      "8 wildlife species protected",
    ],
    featured: true,
  },
  {
    id: "healing-hands-healthcare",
    title: "Healing Hands Mobile Clinics",
    category: "healthcare",
    tagline: "Quality healthcare shouldn't depend on your zip code.",
    description:
      "Our fleet of 6 mobile medical units travels to remote villages in Bangladesh and Myanmar, providing free consultations, vaccinations, maternal care, and chronic disease management to 25,000 patients annually.",
    longDescription:
      "Preventable diseases claim thousands of lives in South Asia simply because communities have no access to a doctor. Our Healing Hands mobile clinics close that gap. Staffed by volunteer physicians, nurses, and community health workers, each unit provides everything from basic check-ups and vaccinations to complex wound care and maternal support. No patient ever pays.",
    goal: 150000,
    raised: 103800,
    donors: 631,
    daysLeft: 18,
    image: "https://picsum.photos/seed/30/800/500",
    location: "Bangladesh & Myanmar",
    impact: [
      "25,000 patients annually",
      "6 mobile clinics deployed",
      "12,000 vaccines administered",
      "4,200 mothers supported",
    ],
    featured: false,
  },
  {
    id: "clean-water-initiative",
    title: "Clean Water for All Initiative",
    category: "water",
    tagline: "Clean water is a right, not a privilege.",
    description:
      "We're drilling 40 freshwater wells and installing solar-powered filtration systems in drought-prone regions of Ethiopia and South Sudan, delivering safe drinking water to 18,000 people.",
    longDescription:
      "Millions of people walk hours each day to reach contaminated water sources, exposing entire families to deadly disease. Our Clean Water for All Initiative deploys hydrogeological surveys to locate aquifers, drills deep boreholes, installs solar-powered pumps, and trains village water committees to maintain each system for decades. Your gift doesn't just deliver water — it delivers time, health, and dignity.",
    goal: 85000,
    raised: 47600,
    donors: 318,
    daysLeft: 45,
    image: "https://picsum.photos/seed/40/800/500",
    location: "Ethiopia & South Sudan",
    impact: [
      "40 wells drilled",
      "18,000 people served",
      "Solar-powered filtration",
      "Disease rates cut by 62%",
    ],
    featured: true,
  },
  {
    id: "rapid-relief-disaster",
    title: "Rapid Relief Disaster Fund",
    category: "disaster",
    tagline: "When disaster strikes, every hour matters.",
    description:
      "Our rapid-response teams provide immediate food, shelter, and medical care to disaster-affected communities within 48 hours. Currently active across earthquake-affected regions of Turkey and Pakistan.",
    longDescription:
      "Natural disasters don't wait for bureaucracy. Our Rapid Relief Disaster Fund maintains pre-positioned supply depots and trained response teams in high-risk regions so that when earthquakes, floods, or cyclones strike, we're already there. We provide emergency shelter kits, food parcels, clean water, hygiene supplies, and psychological first aid — and we stay to support long-term community rebuilding.",
    goal: 200000,
    raised: 164300,
    donors: 892,
    daysLeft: 8,
    image: "https://picsum.photos/seed/50/800/500",
    location: "Turkey & Pakistan",
    impact: [
      "15,000 families sheltered",
      "300 tons of food distributed",
      "48-hour deployment guarantee",
      "12 response teams active",
    ],
    featured: false,
  },
];

export const getCauseById = (id: string): Cause | undefined =>
  causes.find((c) => c.id === id);
