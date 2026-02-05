"use client";

import React from "react";
import { useJobs } from "@/context/JobsContext";

function getStatusStyle(status: string) {
  switch (status) {
    case "Interview Scheduled":
      return "bg-purple-100 text-purple-700";
    case "Pending Review":
      return "bg-gray-100 text-gray-700";
    case "Rejected":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

export default function ApplicationsPage() {
  const { appliedJobs } = useJobs();

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Your Applications
      </h1>

      {appliedJobs.length === 0 ? (
        <p className="text-center mt-10 text-gray-500">
          You haven’t applied to any jobs yet.
        </p>
      ) : (
        <div className="space-y-5">
          {appliedJobs.map((job) => (
            <div
              key={job.id}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start justify-between">
                
                                <div>
                  <h3 className="font-semibold text-gray-900">
                    {job.title}
                  </h3>

                  <p className="text-sm text-gray-600 mt-1">
                    {job.company}
                  </p>

                  <p className="text-xs text-gray-400 mt-2">
                    Applied recently
                  </p>
                </div>

                              <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusStyle(
                    "Applied"
                  )}`}
                >
                  Applied
                </span>

              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
