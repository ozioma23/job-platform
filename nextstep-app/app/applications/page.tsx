"use client";

import React from "react";
import JobList from "@/components/jobs/JobList";
import { useJobs } from "@/context/JobsContext";

export default function ApplicationsPage() {
  const { appliedJobs } = useJobs(); 

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">Applied Jobs</h1>

      {appliedJobs.length === 0 ? (
        <p className="text-center mt-10 text-gray-500">
          You haven’t applied to any jobs yet.
        </p>
      ) : (
        <JobList jobs={appliedJobs} />
      )}
    </main>
  );
}
