"use client";

import React from "react";
import JobList from "@/components/jobs/JobList";
import { useJobs } from "@/context/JobsContext";

export default function ApplicationsPage() {
  const { appliedJobs } = useJobs(); // <-- Make sure appliedJobs exists in JobsContext

  if (!appliedJobs || appliedJobs.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-6 py-16 text-center text-gray-500">
        <h1 className="text-2xl font-bold mb-4">Applied Jobs</h1>
        <p>No applied jobs yet.</p>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">Applied Jobs</h1>
      <JobList jobs={appliedJobs} />
    </main>
  );
}
