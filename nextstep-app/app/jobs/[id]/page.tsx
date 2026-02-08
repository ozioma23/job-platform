"use client";

import { useJobs } from "@/context/JobsContext";
import { useUser } from "@/context/UserContext";
import { useParams } from "next/navigation";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { MapPin, Briefcase, Globe } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function JobDetailsPage() {
 const { jobs, filteredJobs, appliedJobs, applyJob, applyToJob } = useJobs();

  const { user } = useUser();
  const params = useParams();
  const router = useRouter();

  const jobId = params.id as string;

  const job = jobs.find((j) => j.id === jobId);


  if (!job) {
    return (
      <main className="max-w-3xl mx-auto py-20 text-center px-4">
        <p className="text-gray-500">Job not found</p>
        <Link href="/" className="text-[#5B5AF7] mt-4 inline-block">
          Back to Jobs
        </Link>
      </main>
    );
  }

  const isApplied = appliedJobs.some((j) => j.id === job.id);

  const relatedJobs = filteredJobs.filter(
    (j) => j.category === job.category && j.id !== job.id
  );

  const handleApply = () => {
  if (!user) {
    alert("Please log in to apply.");
    return;
  }

  router.push(`/jobs/${job.id}/apply`);
};


  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
            <Link
        href="/"
        className="text-sm text-gray-500 hover:text-[#5B5AF7]"
      >
        ← Back to Job Listings
      </Link>

            <div className="mt-4 mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {job.title}
        </h1>
        <p className="text-gray-600 mt-1">{job.company}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-10">
        <section className="lg:col-span-2 space-y-6 sm:space-y-8">
                   <div className="rounded-xl bg-white p-4 sm:p-6 border border-gray-100 shadow-sm">
            <h3 className="font-semibold mb-4">Job Information</h3>

            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-gray-400 shrink-0" />
                <span>{job.location}</span>
              </div>

              {job.type && (
                <div className="flex items-center gap-2">
                  <Briefcase size={16} className="text-gray-400 shrink-0" />
                  <span>{job.type}</span>
                </div>
              )}

              {job.isRemote && (
                <div className="flex items-center gap-2">
                  <Globe size={16} className="text-gray-400 shrink-0" />
                  <span>Remote</span>
                </div>
              )}
            </div>

            {job.requirements && (
              <>
                <h4 className="mt-6 mb-3 text-sm font-semibold text-gray-700">
                  Required Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {job.requirements.map((skill, i) => (
                    <Badge key={i}>{skill}</Badge>
                  ))}
                </div>
              </>
            )}
          </div>

                <div className="rounded-xl bg-white p-4 sm:p-6 border border-gray-100 shadow-sm">
            <h3 className="font-semibold">Job Description</h3>
            <p className="text-gray-700 leading-relaxed">
              {job.description}
            </p>
          </div>

          {job.responsibilities && (
            <div className="rounded-xl bg-white p-4 sm:p-6 border border-gray-100 shadow-sm">
              <h3 className="font-semibold mb-3">Responsibilities</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {job.responsibilities.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {job.qualifications && (
            <div className="rounded-xl bg-white p-4 sm:p-6 border border-gray-100 shadow-sm">
              <h3 className="font-semibold mb-3">Qualifications</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {job.qualifications.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {job.benefits && (
            <div className="rounded-xl bg-white p-4 sm:p-6 border border-gray-100 shadow-sm">
              <h3 className="font-semibold mb-3">Benefits</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {job.benefits.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

                    <div className="w-full sm:w-auto">
            <Button onClick={handleApply} disabled={isApplied}>
              {isApplied ? "Already Applied" : "Apply Now"}
            </Button>
          </div>
        </section>

      
        <aside className="space-y-6 mt-6 lg:mt-0">
          <div className="rounded-xl bg-white p-4 sm:p-6 border border-gray-100 shadow-sm">
            <h3 className="font-semibold mb-4">Related Jobs</h3>
            <ul className="space-y-4">
              {relatedJobs.slice(0, 4).map((job) => (
                <li key={job.id}>
                  <Link
                    href={`/jobs/${job.id}`}
                    className="block hover:text-[#5B5AF7]"
                  >
                    <p className="text-sm font-medium">{job.title}</p>
                    <p className="text-xs text-gray-500">
                      {job.company}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}
