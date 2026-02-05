"use client";

import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { user, logout } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="min-h-[80vh] bg-gray-50 py-12">
      <div className="mx-auto max-w-5xl px-6">

        {/* Title */}
        <h1 className="mb-8 text-2xl font-semibold text-gray-900">
          Profile
        </h1>

              <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <h2 className="text-sm font-semibold text-gray-700">
              Personal Information
            </h2>

            <button className="rounded-md border px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-50">
              Edit Profile
            </button>
          </div>

          <div className="mt-6 flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-700 text-xl font-bold text-white">
              {user.username.charAt(0).toUpperCase()}
            </div>

            <div>
              <p className="font-semibold text-gray-900">
                {user.username}
              </p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <h2 className="text-sm font-semibold text-gray-700">
              Skills
            </h2>

            <button className="rounded-md border px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-50">
              Manage Skills
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "React",
              "TypeScript",
              "Tailwind CSS",
              "UI/UX Design",
              "Project Management",
              "Agile Methodologies",
              "Problem Solving",
              "Communication",
            ].map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

               <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <h2 className="text-sm font-semibold text-gray-700">
              Work Experience
            </h2>

            <button className="rounded-md border px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-50">
              Add/Edit Experience
            </button>
          </div>

          <div className="mt-5 space-y-5">
            <div>
              <p className="font-medium text-gray-900">
                Senior Frontend Developer
              </p>
              <p className="text-sm text-gray-500">
                Tech Innovations Inc.
              </p>
              <p className="text-xs text-gray-400">
                Jan 2022 – Present
              </p>
            </div>

            <div className="border-t pt-4">
              <p className="font-medium text-gray-900">
                Junior UI Engineer
              </p>
              <p className="text-sm text-gray-500">
                Creative Solutions LLC
              </p>
              <p className="text-xs text-gray-400">
                Jul 2019 – Dec 2021
              </p>
            </div>
          </div>
        </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-gray-700">
            Security Settings
          </h2>

          <div className="space-y-3 text-sm text-gray-700">
            <button className="block hover:text-purple-700">
              Change Password
            </button>
            <button className="block hover:text-purple-700">
              Two-Factor Authentication
            </button>
            <button
              onClick={logout}
              className="block text-red-600 hover:text-red-700"
            >
              Logout
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
