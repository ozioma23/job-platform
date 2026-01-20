import React from "react";
import { Job } from "@/types/job";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 flex flex-col md:flex-row justify-between gap-4 hover:shadow-lg transition-shadow">
      {/* Left: Job Info */}
      <div className="flex flex-col md:flex-1 gap-2">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          {job.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">{job.company}</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{job.location}</p>

        <div className="flex flex-wrap gap-2 mt-2">
          <Badge>{job.category}</Badge>
          <Badge>{job.experienceLevel}</Badge>
          {job.isRemote && <Badge>Remote</Badge>}
        </div>
      </div>

      {/* Right: Apply Button */}
      <div className="flex items-center justify-end md:justify-center">
        <Button>
          Apply Now
        </Button>
      </div>
    </div>
  );
};

export default JobCard;

