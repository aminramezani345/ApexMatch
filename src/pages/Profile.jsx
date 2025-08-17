import React, { useState } from "react";
import { Upload, Mail, Globe, MapPin, Linkedin, Save, X, User as UserIcon, FileText } from "lucide-react";
import { useToast } from "../components/Toast.jsx";

export default function Profile() {
  const { push } = useToast();

  const [data, setData] = useState({
    fullName: "ApexMatch User",
    headline: "Senior Product & Data Leader",
    email: "user@example.com",
    location: "Boston, MA",
    website: "https://apexmatch.ai",
    linkedin: "https://www.linkedin.com/in/your-handle",
    resumeUrl: "",
    skills: ["Executive Search", "Data Science", "Product Strategy"],
    about: "Focused on building data-driven executive matching solutions.",
  });

  const [avatar, setAvatar] = useState(null);
  const [saving, setSaving] = useState(false);

  const onChange = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.value }));
  const addSkill = (e) => {
    e.preventDefault();
    const v = e.target.skill.value?.trim();
    if (!v) return;
    if (!data.skills.includes(v)) setData((d) => ({ ...d, skills: [...d.skills, v] }));
    e.target.reset();
  };
  const removeSkill = (s) => setData((d) => ({ ...d, skills: d.skills.filter((k) => k !== s) }));
  const onAvatar = (e) => {
    const f = e.target.files?.[0]; if (!f) return;
    const url = URL.createObjectURL(f); setAvatar(url);
  };

  const onSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 700));
    setSaving(false);
    push("Profile saved.");
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-slate-900">Profile</h1>
        <button
          onClick={onSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
        >
          <Save className="h-4 w-4" />
          {saving ? "Saving..." : "Save"}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Avatar & quick info */}
        <div className="rounded-xl border bg-white p-5">
          <div className="flex items-center gap-4">
            <div className="relative">
              {avatar ? (
                <img src={avatar} alt="Avatar" className="h-20 w-20 rounded-xl object-cover ring-1 ring-slate-200" />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-slate-100 ring-1 ring-slate-200">
                  <UserIcon className="h-8 w-8 text-slate-400" />
                </div>
              )}
              <label className="absolute -bottom-2 -right-2 inline-flex cursor-pointer items-center gap-1 rounded-lg bg-slate-900 px-2 py-1 text-xs text-white hover:bg-slate-800">
                <Upload className="h-3.5 w-3.5" />
                Upload
                <input type="file" accept="image/*" className="hidden" onChange={onAvatar} />
              </label>
            </div>

            <div className="min-w-0">
              <input
                className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                value={data.fullName}
                onChange={onChange("fullName")}
                placeholder="Full name"
              />
              <input
                className="mt-2 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                value={data.headline}
                onChange={onChange("headline")}
                placeholder="Headline (e.g., VP Engineering)"
              />
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <Field icon={<Mail />} value={data.email} onChange={onChange("email")} placeholder="Email" type="email" />
            <Field icon={<MapPin />} value={data.location} onChange={onChange("location")} placeholder="Location" />
            <Field icon={<Globe />} value={data.website} onChange={onChange("website")} placeholder="Website" />
            <Field icon={<Linkedin />} value={data.linkedin} onChange={onChange("linkedin")} placeholder="LinkedIn URL" />
            <Field icon={<FileText />} value={data.resumeUrl} onChange={onChange("resumeUrl")} placeholder="Resume / Portfolio URL" />
          </div>
        </div>

        {/* Right column: skills & about */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border bg-white p-5">
            <h2 className="mb-3 text-base font-semibold text-slate-900">Skills</h2>
            <div className="mb-3 flex flex-wrap gap-2">
              {data.skills.map((s) => (
                <span key={s} className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs ring-1 ring-slate-200">
                  {s}
                  <button onClick={() => removeSkill(s)} className="text-slate-500 hover:text-slate-700" title="Remove">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </span>
              ))}
              {data.skills.length === 0 && (<span className="text-xs text-slate-500">No skills yet. Add some below.</span>)}
            </div>
            <form onSubmit={addSkill} className="flex items-center gap-2">
              <input name="skill" className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="Add a skill (e.g., Fundraising)" />
              <button className="rounded-lg bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-800">Add</button>
            </form>
          </div>

          <div className="rounded-xl border bg-white p-5">
            <h2 className="mb-3 text-base font-semibold text-slate-900">About</h2>
            <textarea
              rows={6}
              className="w-full rounded-lg border px-3 py-2 text-sm leading-relaxed outline-none focus:ring-2 focus:ring-blue-500"
              value={data.about}
              onChange={onChange("about")}
              placeholder="Tell us about your experience, achievements, and goals…"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={onSave}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
            >
              <Save className="h-4 w-4" />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ icon, ...props }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-slate-500">{React.cloneElement(icon, { className: "h-4 w-4" })}</span>
      <input
        className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        {...props}
      />
    </div>
  );
}
