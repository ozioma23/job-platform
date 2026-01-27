"use client";

import { useJobs } from "@/context/JobsContext";
import { useUser } from "@/context/UserContext";
import { useParams } from "next/navigation";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function JobDetailsPage() {
  const { filteredJobs, appliedJobs, applyJob } = useJobs();
  const { user } = useUser();
  const params = useParams();
  const jobId = params.id as string;

  const job = filteredJobs.find((j) => j.id === jobId);

  if (!job) {
    return (
      <main className="max-w-3xl mx-auto py-20 text-center">
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
    if (!isApplied) {
      applyJob(job);
      alert("Application submitted!");
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* LEFT CONTENT */}
      <section className="lg:col-span-2 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
          <p className="text-gray-600 mt-1">{job.company}</p>

          <div className="flex flex-wrap gap-2 mt-3">
            <Badge>{job.location}</Badge>
            {job.type && <Badge>{job.type}</Badge>}
            {job.isRemote && <Badge>Remote</Badge>}
          </div>
        </div>

        {/* Skills */}
        {job.requirements && (
          <section>
            <h2 className="text-lg font-semibold mb-3">Required Skills</h2>
            <div className="flex flex-wrap gap-2">
              {job.requirements.map((skill, i) => (
                <Badge key={i}>{skill}</Badge>
              ))}
            </div>
          </section>
        )}

        {/* Description */}
        <section>
          <h2 className="text-lg font-semibold mb-2">Job Description</h2>
          <p className="text-gray-700 leading-relaxed">
            {job.description}
          </p>
        </section>

        {/* Responsibilities */}
        {job.responsibilities && (
          <section>
            <h2 className="text-lg font-semibold mb-2">Responsibilities</h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              {job.responsibilities.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Benefits */}
        <section>
          <h2 className="text-lg font-semibold mb-2">Benefits</h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>Competitive salary</li>
            <li>Flexible working hours</li>
            <li>Health insurance</li>
            <li>Career growth opportunities</li>
          </ul>
        </section>

        {/* Apply Button */}
        <div className="pt-6">
          <Button onClick={handleApply} disabled={isApplied}>
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>
      </section>

      {/* RIGHT SIDEBAR */}
      <aside className="space-y-6">
        {/* Job Info */}
        <div className="border rounded-lg p-6 bg-white">
          <h3 className="font-semibold mb-4">Job Information</h3>
          <ul className="text-sm space-y-2 text-gray-600">
            <li><strong>Location:</strong> {job.location}</li>
            <li><strong>Job Type:</strong> {job.type}</li>
            <li><strong>Experience:</strong> {job.experienceLevel}</li>
            <li><strong>Posted:</strong> {job.postedAt}</li>
          </ul>
        </div>

        {/* Related Jobs */}
        <div className="border rounded-lg p-6 bg-white">
          <h3 className="font-semibold mb-4">Related Jobs</h3>
          <ul className="space-y-3">
            {relatedJobs.slice(0, 4).map((job) => (
              <li key={job.id}>
                <Link
                  href={`/jobs/${job.id}`}
                  className="block text-sm hover:text-[#5B5AF7]"
                >
                  {job.title}
                  <p className="text-xs text-gray-500">{job.company}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </main>
  );
}
