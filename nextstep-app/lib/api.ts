import { jobs } from "@/data/jobs";
import { Job } from "@/types/job";

// Fetch all jobs
export const getJobs = async (): Promise<Job[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(jobs), 500); // simulate network delay
  });
};

// Fetch a single job by ID
export const getJobById = async (id: string): Promise<Job | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(jobs.find((job) => job.id === id)), 300);
  });
};
