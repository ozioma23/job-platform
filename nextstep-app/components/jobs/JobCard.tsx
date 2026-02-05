"use client";

import { useParams, useRouter } from "next/navigation";
import { Job } from "@/types/job";
import { useJobs } from "@/context/JobsContext";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import { Briefcase, Clock, Building2, MapPin, Bookmark, Trash2 } from "lucide-react";
import { timeAgo } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

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
      className="rounded-2xl bg-white p-6 shadow-md hover:shadow-lg transition"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {job.title}
          </h3>

          {/* ✅ Saved variant shows icon rows instead of inline text */}
          {variant === "saved" ? (
            <div className="mt-2 space-y-1 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Building2 size={14} />
                <span>{job.company}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} />
                <span>{job.location}</span>
              </div>
            </div>
          ) : (
            <p className="mt-1 text-sm text-gray-600">
              {job.company} • {job.location}
            </p>
          )}
        </div>

        {/* unchanged for default */}
        {variant !== "saved" && job.type && (
          <span className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
            <Briefcase size={14} />
            {job.type}
          </span>
        )}
      </div>

      {/* default-only sections */}
      {variant !== "saved" && job.description && (
        <p className="mt-4 text-sm text-gray-600 line-clamp-3">
          {job.description}
        </p>
      )}

      {variant !== "saved" && job.requirements && (
        <div className="pt-6 pb-6">
          <div className="flex flex-wrap gap-2">
            {job.requirements.map((skill, i) => (
              <Badge key={i}>{skill}</Badge>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between">

        {/* default = time */}
        {variant !== "saved" && (
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <Clock size={14} />
            {job.postedAt ? timeAgo(job.postedAt) : "Recently posted"}
          </span>
        )}

        {/* ✅ saved = status badge left */}
        {variant === "saved" && (
          <span className="flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full bg-purple-100 text-purple-700">
            <Bookmark size={14} />
            {isApplied ? "Applied" : "Saved"}
          </span>
        )}

        {/* Buttons */}
        <div className="flex gap-3 ml-auto">
          <button
            onClick={handleSave}
            className={`rounded-lg px-5 py-2 text-sm font-medium flex items-center gap-2 ${
              variant === "saved"
                ? "bg-red-500 text-white hover:bg-red-600"
                : isSaved
                ? "border border-purple-600 text-purple-600"
                : "border border-gray-300 text-gray-600 hover:border-purple-600 hover:text-purple-600"
            }`}
          >
            {variant === "saved" && <Trash2 size={16} />}
            {variant === "saved" ? "Remove" : isSaved ? "Saved" : "Save"}
          </button>

          {variant !== "saved" && (
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
              className={`rounded-lg px-6 py-2 text-sm font-medium text-white ${
                isApplied
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-indigo-700"
              }`}
            >
              {isApplied ? "Applied" : "Apply Now"}
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}
