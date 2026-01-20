export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  experienceLevel: "Entry" | "Mid" | "Senior";
  description: string;
  postedAt: string;
  logoUrl?: string;
  isRemote: boolean;
  salaryRange: string;
}
