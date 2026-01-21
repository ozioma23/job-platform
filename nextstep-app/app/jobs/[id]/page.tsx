import { getJobById } from "@/lib/api";

type JobDetailsPageProps = {
  params: { id: string };
};

export default async function JobDetailsPage({
  params,
}: JobDetailsPageProps) {
  const job = await getJobById(params.id); // ✅ FIX IS HERE

  if (!job) {
    return <div className="p-6">Job not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* MAIN CONTENT */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{job.title}</h1>
            <p className="text-gray-600 mt-1">
              {job.company} • {job.location}
            </p>
          </div>

          <div className="space-y-4">
            <section>
              <h2 className="text-xl font-semibold mb-2">Job Description</h2>
              <p className="text-gray-700">{job.description}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">Responsibilities</h2>
              <ul className="list-disc pl-5 text-gray-700">
                {job.responsibilities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">Requirements</h2>
              <ul className="list-disc pl-5 text-gray-700">
                {job.requirements.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>
          </div>

          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Apply Now
          </button>
        </div>

        {/* SIDEBAR */}
        <aside className="bg-white border rounded-lg p-6 space-y-4 h-fit">
          <h3 className="text-lg font-semibold">Job Summary</h3>

          <div className="text-sm space-y-2">
            <p><span className="font-medium">Company:</span> {job.company}</p>
            <p><span className="font-medium">Job Type:</span> {job.type}</p>
            <p><span className="font-medium">Salary:</span> {job.salary}</p>
            <p><span className="font-medium">Posted:</span> {job.postedAt}</p>
          </div>
        </aside>

      </div>
    </div>
  );
}
