"use client";

import { Job } from "@/types/job";
import { useJobs } from "@/context/JobsContext";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import { Briefcase, Clock } from "lucide-react";

interface JobCardProps {
  job: Job;
  variant?: "default" | "saved";
}

export default function JobCard({ job, variant = "default" }: JobCardProps) {
  const {
    appliedJobs,
    applyJob,
    savedJobs,
    saveJob,
    unsaveJob,
  } = useJobs();

  const { user } = useUser();

  const isApplied = appliedJobs.some((j) => j.id === job.id);
  const isSaved = savedJobs.some((j) => j.id === job.id);

  const handleApply = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      alert("Please log in or sign up to apply.");
      return;
    }

    if (!isApplied) {
      applyJob(job);
    }
  };

  const handleSave = (e: React.MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();

  if (!user) {
    alert("Please log in or sign up to save jobs.");
    return;
  }

  if (isSaved) {
    unsaveJob(job.id);
  } else {
    saveJob(job);
  }
};


   const timeAgo = (dateString: string) => {
    const now = new Date();
    const postedDate = new Date(dateString);
    const diffMs = now.getTime() - postedDate.getTime();

    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    if (diffMinutes < 60) return `${diffMinutes}m ago`;

    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays}d ago`;

    const diffWeeks = Math.floor(diffDays / 7);
    return `${diffWeeks}w ago`;
  };

  return (
    <Link
      href={`/jobs/${job.id}`}
      className="block rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {job.title}
          </h3>

          <p className="mt-1 text-sm text-gray-600">
            {job.company} • {job.location}
          </p>
        </div>

        {job.type && (
          <span className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
            <Briefcase size={14} />
            {job.type}
          </span>
        )}
      </div>

      {job.description && (
        <p className="mt-4 text-sm text-gray-600 line-clamp-3">
          {job.description}
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {job.category && (
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-purple-600">
            {job.category}
          </span>
        )}
        {job.experienceLevel && (
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-purple-600">
            {job.experienceLevel}
          </span>
        )}
        {job.isRemote && (
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-purple-600">
            Remote
          </span>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between">
        
        <span className="flex items-center gap-1 text-xs text-gray-400">
          <Clock size={14} />
          {job.postedAt ? timeAgo(job.postedAt) : "Recently posted"}
        </span>

        <div className="flex gap-3">
          {variant === "saved" ? (
            <button
              onClick={handleSave}
              className="rounded-lg border border-red-500 px-6 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              Remove
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className={`rounded-lg border px-5 py-2 text-sm font-medium
                  ${
                    isSaved
                      ? "border-purple-600 text-purple-600"
                      : "border-gray-300 text-gray-600 hover:border-purple-600 hover:text-purple-600"
                  }`}
              >
                {isSaved ? "Saved" : "Save"}
              </button>

              <button
                onClick={handleApply}
                disabled={isApplied}
                className={`rounded-lg px-6 py-2 text-sm font-medium text-white
                  ${
                    isApplied
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-indigo-700"
                  }`}
              >
                {isApplied ? "Applied" : "Apply Now"}
              </button>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
