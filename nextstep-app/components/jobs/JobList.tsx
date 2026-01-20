"use client";

import React, { useEffect, useState } from "react";
import { Job } from "@/types/job";
import { getJobs } from "@/lib/api";
import JobCard from "./JobCard";

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await getJobs();
      setJobs(data);
      setLoading(false);
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <p className="text-center text-gray-500 mt-10">
        Loading job listings...
      </p>
    );
  }

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
