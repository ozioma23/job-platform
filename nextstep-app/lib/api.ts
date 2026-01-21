import { jobs } from "@/data/jobs";
import { Job } from "@/types/job";

// Fetch all jobs
export const getJobs = async (): Promise<Job[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(jobs), 500); // simulate network delay
  });
};

export async function getJobById(id: string): Promise<Job | undefined> {
  return jobs.find((job) => job.id === id);
}

