"use client";

import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const loadProfileData = (userId: string | null) => {
  if (typeof window === "undefined" || !userId) return null;
  const data = localStorage.getItem(`profileData-${userId}`);
  return data ? JSON.parse(data) : null;
};

const saveProfileData = (userId: string | null, data: any) => {
  if (!userId) return;
  localStorage.setItem(`profileData-${userId}`, JSON.stringify(data));
};

export default function ProfilePage() {
  const { user, logout, updateUser } = useUser();
  const router = useRouter();

  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    setLoadingUser(false);
  }, []);

  useEffect(() => {
    if (!loadingUser && !user) {
      router.push("/login");
    }
  }, [user, loadingUser, router]);

  // Load profile data for current user
  const stored = loadProfileData(user?.id || null);

  const [avatar, setAvatar] = useState(stored?.avatar || "");
  const [username, setUsername] = useState(user?.username || "");
  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });
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

  const [newExperience, setNewExperience] = useState({
    role: "",
    company: "",
    period: "",
  });

  const [showSkillsModal, setShowSkillsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingChoice, setEditingChoice] = useState<"username" | "password" | null>(null);

  // Save profile data whenever it changes for current user
  useEffect(() => {
    if (user) {
      saveProfileData(user.id, { avatar, skills, experience });
    }
  }, [avatar, skills, experience, user]);

  // Clear profile data when user logs out
  useEffect(() => {
    if (!user) {
      setAvatar("");
      setUsername("");
      setSkills([]);
      setExperience([]);
    }
  }, [user]);

  if (!user) return null;

  const handleUsernameSave = () => {
    if (!username.trim()) {
      alert("Username cannot be empty!");
      return;
    }
    updateUser({ ...user, username });
    setEditingChoice(null);
    setShowEditModal(false);
  };

  const handlePasswordSave = () => {
    if (!passwords.current || !passwords.newPassword || !passwords.confirm) {
      alert("All password fields are required!");
      return;
    }

    if (passwords.newPassword !== passwords.confirm) {
      alert("New password and confirm password do not match!");
      return;
    }

    alert("Password changed successfully!");
    setPasswords({ current: "", newPassword: "", confirm: "" });
    setEditingChoice(null);
    setShowEditModal(false);
  };

  const handleAddExperience = () => {
    if (!newExperience.role || !newExperience.company || !newExperience.period) return;
    setExperience([...experience, newExperience]);
    setNewExperience({ role: "", company: "", period: "" });
  };

  // ------------------ RENDER ------------------
  return (
    <div className="min-h-[80vh] bg-gray-50 py-6 sm:py-12">
      <div className="mx-auto max-w-3xl sm:max-w-5xl px-4 sm:px-6 space-y-6">

        {/* Page Title */}
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 text-center sm:text-left">
          My Profile
        </h1>

        {/* ================= USERNAME CARD ================= */}
        <div className="rounded-xl bg-white p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <label className="cursor-pointer flex-shrink-0">
              {avatar ? (
                <img src={avatar} className="h-12 w-12 sm:h-16 sm:w-16 rounded-full object-cover" />
              ) : (
                <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-purple-700 text-lg sm:text-xl font-bold text-white">
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
                  reader.onload = () => setAvatar(reader.result as string);
                  reader.readAsDataURL(file);
                }}
              />
            </label>
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-gray-900 text-base sm:text-lg">{user.username}</p>
              <p className="text-gray-500 text-sm sm:text-base">{user.email}</p>
            </div>
          </div>
          <button
            onClick={() => setShowEditModal(true)}
            className="rounded-md border px-4 py-1.5 text-sm sm:text-base text-gray-600 hover:bg-gray-50 mt-2 sm:mt-0"
          >
            Edit Profile
          </button>
        </div>


        {/* ================= WORK EXPERIENCE CARD ================= */}
        <div className="rounded-xl bg-white p-4 sm:p-6 shadow-sm flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h2 className="text-sm sm:text-base font-semibold text-gray-700">Work Experience</h2>
            <button
              onClick={handleAddExperience}
              className="rounded-md bg-purple-600 px-3 py-1.5 text-sm sm:text-base text-white"
            >
              Add Experience
            </button>
          </div>
          {/* Inputs */}
          <div className="flex flex-col sm:flex-row gap-2 mt-2">
            <input
              placeholder="Role"
              value={newExperience.role}
              onChange={(e) => setNewExperience({ ...newExperience, role: e.target.value })}
              className="border rounded px-3 py-1 text-sm sm:text-base flex-1"
            />
            <input
              placeholder="Company"
              value={newExperience.company}
              onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
              className="border rounded px-3 py-1 text-sm sm:text-base flex-1"
            />
            <input
              placeholder="Period"
              value={newExperience.period}
              onChange={(e) => setNewExperience({ ...newExperience, period: e.target.value })}
              className="border rounded px-3 py-1 text-sm sm:text-base flex-1"
            />
          </div>
          {/* Experience List */}
          <div className="mt-4 space-y-3">
            {experience.map((exp, i) => (
              <div key={i} className="border-t pt-2 flex flex-col sm:flex-row sm:justify-between gap-2">
                <div>
                  <p className="font-medium text-gray-900 text-sm sm:text-base">{exp.role}</p>
                  <p className="text-gray-500 text-xs sm:text-sm">{exp.company}</p>
                  <p className="text-gray-400 text-xs">{exp.period}</p>
                </div>
                <button
                  onClick={() => setExperience(experience.filter((_, idx) => idx !== i))}
                  className="text-red-500 text-sm mt-1 sm:mt-0"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ================= SKILLS CARD ================= */}
        <div className="rounded-xl bg-white p-4 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h2 className="text-sm sm:text-base font-semibold text-gray-700">My Skills</h2>
            <button
              onClick={() => setShowSkillsModal(true)}
              className="rounded-md border px-4 py-1.5 text-sm sm:text-base text-gray-600 hover:bg-gray-50 mt-2 sm:mt-0"
            >
              Edit
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-purple-100 px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-purple-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* ================= SECURITY CARD ================= */}
        <div className="rounded-xl bg-white p-4 sm:p-6 shadow-sm">
          <h2 className="mb-3 text-sm sm:text-base font-semibold text-gray-700">Security Settings</h2>
          <div className="space-y-2 text-sm sm:text-base">
            <button className="block hover:text-purple-700">Two-Factor Authentication</button>
            <button onClick={logout} className="block text-red-600 hover:text-red-700">
              Logout
            </button>
          </div>
        </div>

        {/* ================= SKILLS MODAL ================= */}
        {showSkillsModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-sm sm:max-w-md shadow-lg">
              <h3 className="font-semibold mb-4 text-sm sm:text-base">Manage Skills</h3>
              <div className="space-y-2 text-sm sm:text-base">
                {skills.map((skill) => (
                  <div key={skill} className="flex justify-between">
                    {skill}
                    <button onClick={() => setSkills(skills.filter((s) => s !== skill))} className="text-red-500">
                      remove
                    </button>
                  </div>
                ))}
              </div>
              <input
                placeholder="New skill"
                className="mt-3 w-full border rounded px-3 py-2 text-sm sm:text-base"
                onKeyDown={(e: any) => {
                  if (e.key === "Enter") {
                    setSkills([...skills, e.target.value]);
                    e.target.value = "";
                  }
                }}
              />
              <button
                onClick={() => setShowSkillsModal(false)}
                className="mt-3 w-full bg-purple-600 text-white rounded py-2 text-sm sm:text-base"
              >
                Done
              </button>
            </div>
          </div>
        )}

        {/* ================= EDIT PROFILE MODAL ================= */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-sm sm:max-w-md shadow-lg">
              {!editingChoice && (
                <>
                  <h3 className="font-semibold mb-4 text-sm sm:text-base">Edit Profile</h3>
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => setEditingChoice("username")}
                      className="w-full border rounded py-2 text-sm sm:text-base"
                    >
                      Edit Username
                    </button>
                    <button
                      onClick={() => setEditingChoice("password")}
                      className="w-full border rounded py-2 text-sm sm:text-base"
                    >
                      Change Password
                    </button>
                    <button
                      onClick={() => setShowEditModal(false)}
                      className="w-full mt-2 bg-gray-200 rounded py-2 text-sm sm:text-base"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}

              {editingChoice === "username" && (
                <>
                  <h3 className="font-semibold mb-4 text-sm sm:text-base">Edit Username</h3>
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full border rounded px-3 py-2 text-sm sm:text-base mb-4"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleUsernameSave}
                      className="flex-1 bg-purple-600 text-white rounded py-2 text-sm sm:text-base"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setUsername(user.username);
                        setEditingChoice(null);
                      }}
                      className="flex-1 border rounded py-2 text-sm sm:text-base"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}

              {editingChoice === "password" && (
                <>
                  <h3 className="font-semibold mb-4 text-sm sm:text-base">Change Password</h3>
                  <input
                    type="password"
                    placeholder="Current password"
                    value={passwords.current}
                    onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                    className="w-full border rounded px-3 py-2 text-sm sm:text-base mb-2"
                  />
                  <input
                    type="password"
                    placeholder="New password"
                    value={passwords.newPassword}
                    onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                    className="w-full border rounded px-3 py-2 text-sm sm:text-base mb-2"
                  />
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    value={passwords.confirm}
                    onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                    className="w-full border rounded px-3 py-2 text-sm sm:text-base mb-4"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handlePasswordSave}
                      className="flex-1 bg-purple-600 text-white rounded py-2 text-sm sm:text-base"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setPasswords({ current: "", newPassword: "", confirm: "" });
                        setEditingChoice(null);
                      }}
                      className="flex-1 border rounded py-2 text-sm sm:text-base"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
