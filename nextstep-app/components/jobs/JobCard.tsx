"use client";

import React from "react"; 
import { Job } from "@/types/job";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { useJobs } from "@/context/JobsContext"; // <-- import context

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const { savedJobs, saveJob, unsaveJob } = useJobs(); // <-- use context

  const isSaved = savedJobs.some((j) => j.id === job.id);

  const handleSaveClick = () => {
    if (isSaved) {
      unsaveJob(job.id);
    } else {
      saveJob(job);
    }
  };

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

      {/* Right: Buttons */}
      <div className="flex flex-col items-end justify-center gap-2">
        <Button onClick={handleSaveClick}>
          {isSaved ? "Unsave" : "Save Job"}
        </Button>
        <Button>Apply Now</Button>
      </div>
    </div>
  );
};

export default JobCard;
