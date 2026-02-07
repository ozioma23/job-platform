"use client";

import React from "react";
import { useJobs } from "@/context/JobsContext";
import JobList from "@/components/jobs/JobList";

export default function SavedJobsPage() {
  const { savedJobs } = useJobs();

  if (savedJobs.length === 0) {
    return (
      <p className="text-center mt-10 px-4 text-gray-500">
        No saved jobs yet.
      </p>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <h1 className="text-xl sm:text-2xl font-bold mb-6">
        Saved Jobs
      </h1>

      <JobList jobs={savedJobs} variant="saved" />
    </main>
  );
}
