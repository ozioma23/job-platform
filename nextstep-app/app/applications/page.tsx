"use client";

import React from "react";
import { useJobs } from "@/context/JobsContext";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const handleDesktopClick = (jobId: string) => {
    if (window.innerWidth >= 640) {
      router.push(`/jobs/${jobId}`);
    }
  };

  const handleArrowClick = (jobId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/jobs/${jobId}`);
  };

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
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition cursor-pointer"
              onClick={() => handleDesktopClick(job.id)}
            >
              <div className="flex items-start justify-between">
                <div>

                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                    {job.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 mt-1">{job.company}</p>


                  <p className="text-[10px] sm:text-xs text-gray-400 mt-2">
                    Applied recently
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusStyle(
                      "Applied"
                    )}`}
                  >
                    Applied
                  </span>

                  <ChevronRight
                    className="w-4 h-4 text-gray-400 block sm:hidden cursor-pointer"
                    onClick={(e) => handleArrowClick(job.id, e)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
