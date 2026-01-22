export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  experienceLevel: string;
  isRemote: boolean;

  // Optional fields
  description?: string;
  responsibilities?: string[];
  requirements?: string[];
  type?: string;       // e.g., Full-time, Part-time
  salary?: string;     // e.g., $50,000 - $60,000
  postedAt?: string;   // e.g., "2 days ago"
}
