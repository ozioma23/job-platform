"use client";

import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/* ========= ADDED: storage helpers ========= */
const loadProfileData = () => {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem("profileData");
  return data ? JSON.parse(data) : null;
};

const saveProfileData = (data: any) => {
  localStorage.setItem("profileData", JSON.stringify(data));
};

export default function ProfilePage() {
  const { user, logout, updateUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  const stored = loadProfileData();

  /* ========= ADDED: enhanced state ========= */
  const [editingProfile, setEditingProfile] = useState(false);
  const [username, setUsername] = useState(user?.username || "");

  const [avatar, setAvatar] = useState(stored?.avatar || "");

  const [skills, setSkills] = useState<string[]>(
    stored?.skills || [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "UI/UX Design",
      "Project Management",
      "Agile Methodologies",
      "Problem Solving",
      "Communication",
    ]
  );

  const [experience, setExperience] = useState<any[]>(
    stored?.experience || [
      {
        role: "Senior Frontend Developer",
        company: "Tech Innovations Inc.",
        period: "Jan 2022 – Present",
      },
      {
        role: "Junior UI Engineer",
        company: "Creative Solutions LLC",
        period: "Jul 2019 – Dec 2021",
      },
    ]
  );

  const [showSkillsModal, setShowSkillsModal] = useState(false);

  /* ========= ADDED: auto-persist ========= */
  useEffect(() => {
    saveProfileData({
      avatar,
      skills,
      experience,
    });
  }, [avatar, skills, experience]);

  if (!user) return null;

  return (
    <div className="min-h-[80vh] bg-gray-50 py-12">
      <div className="mx-auto max-w-5xl px-6">

        {/* Title */}
        <h1 className="mb-8 text-2xl font-semibold text-gray-900">
          Profile
        </h1>

        {/* ================= PERSONAL INFO ================= */}
        <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <h2 className="text-sm font-semibold text-gray-700">
              Personal Information
            </h2>

            {editingProfile ? (
              <button
                onClick={() => {
                  updateUser({ ...user, username });
                  setEditingProfile(false);
                }}
                className="rounded-md bg-purple-600 px-4 py-1.5 text-sm text-white"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setEditingProfile(true)}
                className="rounded-md border px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
              >
                Edit Profile
              </button>
            )}
          </div>

          <div className="mt-6 flex items-center gap-5">

            {/* ========= ADDED: avatar upload ========= */}
            <div className="relative">
              <label className="cursor-pointer">
                {avatar ? (
                  <img
                    src={avatar}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-700 text-xl font-bold text-white">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = () =>
                      setAvatar(reader.result as string);
                    reader.readAsDataURL(file);
                  }}
                />
              </label>
            </div>

            <div>
              {editingProfile ? (
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border rounded px-3 py-1 text-sm"
                />
              ) : (
                <p className="font-semibold text-gray-900">
                  {user.username}
                </p>
              )}
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>

        {/* ================= SKILLS ================= */}
        <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <h2 className="text-sm font-semibold text-gray-700">
              Skills
            </h2>

            <button
              onClick={() => setShowSkillsModal(true)}
              className="rounded-md border px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
            >
              Manage Skills
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* ================= EXPERIENCE ================= */}
        <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <h2 className="text-sm font-semibold text-gray-700">
              Work Experience
            </h2>
          </div>

          <div className="mt-5 space-y-5">
            {experience.map((exp, i) => (
              <div key={i} className="border-t pt-4 flex justify-between">
                <div>
                  <p className="font-medium text-gray-900">
                    {exp.role}
                  </p>
                  <p className="text-sm text-gray-500">
                    {exp.company}
                  </p>
                  <p className="text-xs text-gray-400">
                    {exp.period}
                  </p>
                </div>

                <button
                  onClick={() =>
                    setExperience(
                      experience.filter((_, idx) => idx !== i)
                    )
                  }
                  className="text-red-500 text-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ================= SECURITY ================= */}
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

        {/* ================= SKILLS MODAL ================= */}
        {showSkillsModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
              <h3 className="font-semibold mb-4">
                Manage Skills
              </h3>

              <div className="space-y-2">
                {skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex justify-between text-sm"
                  >
                    {skill}
                    <button
                      onClick={() =>
                        setSkills(
                          skills.filter((s) => s !== skill)
                        )
                      }
                      className="text-red-500"
                    >
                      remove
                    </button>
                  </div>
                ))}
              </div>

              <input
                placeholder="New skill"
                className="mt-4 w-full border rounded px-3 py-2 text-sm"
                onKeyDown={(e: any) => {
                  if (e.key === "Enter") {
                    setSkills([...skills, e.target.value]);
                    e.target.value = "";
                  }
                }}
              />

              <button
                onClick={() => setShowSkillsModal(false)}
                className="mt-4 w-full bg-purple-600 text-white rounded py-2"
              >
                Done
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
