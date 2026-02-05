import React from "react";
import { Job } from "@/types/job";
import JobCard from "./JobCard";

interface JobListProps {
  jobs: Job[];
  variant?: "default" | "saved";
}

const JobList: React.FC<JobListProps> = ({
  jobs,
  variant = "default",
}) => {
  if (jobs.length === 0) {
    return (
      <p className="col-span-full text-center text-gray-500 mt-10">
        No jobs available at the moment.
      </p>
    );
  }

  return (
<div
  className={`grid gap-6 ${
    variant === "saved"
      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      : "grid-cols-1 md:grid-cols-2"
  }`}
>



      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          variant={variant}
        />
      ))}
    </div>
  );
};

export default JobList;
