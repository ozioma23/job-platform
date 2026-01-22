import { Job } from "./job";
import { User } from "./user";

export interface Application {
  id: string;         
  job: Job;         
  user: User;         
  appliedAt: string; 
  status: "Pending" | "Accepted" | "Rejected"; 
}
