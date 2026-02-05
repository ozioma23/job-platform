export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  experienceLevel: string;
  isRemote: boolean;

  description?: string;
  responsibilities?: string[];
  requirements?: string[];
  qualifications?: string[];
  benefits?: string[];

  type?: string;
  salary?: string;
  postedAt?: string;
}
