"use client";

import React from "react";
import { Job } from "@/types/job";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { useJobs } from "@/context/JobsContext";
import { useUser } from "@/context/UserContext";
import Link from "next/link";

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const { savedJobs, saveJob, unsaveJob, appliedJobs, applyJob } = useJobs();
  const { user } = useUser(); // <-- get user state

  const isSaved = savedJobs.some((j) => j.id === job.id);
  const isApplied = appliedJobs.some((j) => j.id === job.id);

  const handleSaveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (isSaved) unsaveJob(job.id);
    else saveJob(job);
  };

  const handleApplyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!user) {
      alert("You must log in or sign up to apply for jobs.");
      return;
    }

    if (!isApplied) {
      applyJob(job);
      alert("You have successfully applied for this job!");
    } else {
      alert("You have already applied to this job.");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 flex flex-col md:flex-row justify-between gap-4 hover:shadow-lg transition-shadow cursor-pointer">
      
      {/* LEFT: Clickable Job Info */}
      <Link href={`/jobs/${job.id}`} className="flex flex-1 flex-col md:flex-row gap-2">
        <div className="flex flex-col md:flex-1 gap-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{job.title}</h2>
          <p className="text-gray-600 dark:text-gray-300">{job.company}</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{job.location}</p>

          <div className="flex flex-wrap gap-2 mt-2">
            <Badge>{job.category}</Badge>
            <Badge>{job.experienceLevel}</Badge>
            {job.isRemote && <Badge>Remote</Badge>}
          </div>
        </div>
      </Link>

      {/* RIGHT: Buttons */}
      <div className="flex flex-col items-end justify-center gap-2">
        <Button onClick={handleSaveClick}>
          {isSaved ? "Unsave" : "Save Job"}
        </Button>
        <Button onClick={handleApplyClick} disabled={isApplied}>
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
    </div>
  );
};

export default JobCard;
