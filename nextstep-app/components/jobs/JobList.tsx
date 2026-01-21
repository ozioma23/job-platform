import React from "react";
import { Job } from "@/types/job";
import JobCard from "./JobCard";

interface JobListProps {
  jobs: Job[];
}

const JobList: React.FC<JobListProps> = ({ jobs }) => {
  if (jobs.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">
        No jobs available at the moment.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobList;
