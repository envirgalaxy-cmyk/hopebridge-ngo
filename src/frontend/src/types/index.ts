export interface Cause {
  id: string;
  title: string;
  category: "education" | "environment" | "healthcare" | "water" | "disaster";
  tagline: string;
  description: string;
  longDescription: string;
  goal: number;
  raised: number;
  donors: number;
  daysLeft: number;
  image: string;
  location: string;
  impact: string[];
  featured: boolean;
}

export interface VolunteerOpportunity {
  id: string;
  role: string;
  category: string;
  location: string;
  commitment: string;
  description: string;
  skills: string[];
  spotsAvailable: number;
  icon: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  title: string;
  location: string;
  avatar: string;
  causeRelated?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  since: string;
}
