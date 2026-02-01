"use client";


import { useParams, useRouter } from "next/navigation";
import { Job } from "@/types/job";
import { useJobs } from "@/context/JobsContext";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import { Briefcase, Clock } from "lucide-react";
import { timeAgo } from "@/lib/utils";

interface JobCardProps {
  job: Job;
  variant?: "default" | "saved";
}

export default function JobCard({ job, variant = "default" }: JobCardProps) {
    const router = useRouter();
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
      alert("Please sign in to apply for jobs.");
      return;
    }

    applyJob(job);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      alert("Please sign in to save jobs.");
      return;
    }

    if (isSaved) {
      unsaveJob(job.id);
    } else {
      saveJob(job);
    }
  };

  return (
    <Link
      href={`/jobs/${job.id}`}
      className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition"
    >
      {/* Header */}
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

      {/* Description */}
      {job.description && (
        <p className="mt-4 text-sm text-gray-600 line-clamp-3">
          {job.description}
        </p>
      )}

      {/* Tags */}
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
    <button
  onClick={handleSave}
  className={`rounded-lg px-5 py-2 text-sm font-medium
    ${
      variant === "saved"
        ? "bg-red-50 text-red-600 border border-red-500 hover:bg-red-100"
        : isSaved
        ? "border border-purple-600 text-purple-600"
        : "border border-gray-300 text-gray-600 hover:border-purple-600 hover:text-purple-600"
    }`}
>
  {variant === "saved" ? "Remove" : isSaved ? "Saved" : "Save"}
</button>


    <button
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      alert("Please sign in to apply for jobs.");
      return;
    }
    router.push(`/jobs/${job.id}/apply`);
  }}
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

  </div>
</div>

    </Link>
  );
}
