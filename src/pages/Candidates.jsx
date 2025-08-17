import React, { useState, useRef } from "react";
import { Upload, FileText, CheckCircle2 } from "lucide-react";
import { useToast } from "../components/Toast.jsx";

const ROLES = ["CEO","CTO","CFO","COO","CMO","CPO","CHRO"];

export default function Candidates() {
  const { push } = useToast();
  const [targets, setTargets] = useState([]);
  const [cvName, setCvName] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const toggleRole = (r) =>
    setTargets((t) => (t.includes(r) ? t.filter((x) => x !== r) : [...t, r]));

  const onFile = (file) => {
    if (!file) return;
    setCvName(file.name);
    push("CV uploaded (local preview only).");
  };

  const onDrop = (e) => {
    e.preventDefault(); setDragOver(false);
    onFile(e.dataTransfer.files?.[0]);
  };

  const completion = Math.min(100, ( (cvName ? 50 : 0) + (targets.length ? 50 : 0) ));

  return (
    <div className="p-6">
      <h1 className="text-3xl font-extrabold text-slate-900">My Profile</h1>
      <p className="text-slate-600">Manage your personal information and preferences.</p>

      {/* completion */}
      <div className="mt-6 rounded-xl border bg-white p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-600">Profile completion</div>
          <div className="text-sm font-semibold">{completion}%</div>
        </div>
        <div className="mt-2 h-2 w-full rounded-full bg-slate-100">
          <div className="h-2 rounded-full bg-gradient-to-r from-blue-600 to-teal-600" style={{ width: `${completion}%` }} />
        </div>
      </div>

      {/* CV & roles */}
      <div className="mt-6 grid grid-cols-1 gap-6">
        <div className="rounded-xl border bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900">Your CV</h2>
          <div
            className={`mt-3 flex min-h-[140px] cursor-pointer items-center justify-center rounded-xl border-2 border-dashed
             ${dragOver ? "border-teal-500 bg-teal-50" : "border-slate-300"} `}
            onDragEnter={() => setDragOver(true)}
            onDragOver={(e) => e.preventDefault()}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
          >
            <div className="text-center text-slate-600">
              <Upload className="mx-auto mb-2 h-6 w-6" />
              {cvName ? (
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm">
                  <FileText className="h-4 w-4" /> {cvName}
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                </span>
              ) : (
                <span>Drag & drop or <span className="underline">click</span> to upload your CV</span>
              )}
            </div>
            <input ref={inputRef} type="file" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
          </div>
        </div>

        <div className="rounded-xl border bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900">Your Target C-Level Roles</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {ROLES.map((r) => (
              <button
                key={r}
                onClick={() => toggleRole(r)}
                className={`rounded-full px-3 py-1 text-sm ring-1 transition ${
                  targets.includes(r)
                    ? "bg-slate-900 text-white ring-slate-900"
                    : "bg-white text-slate-700 ring-slate-300 hover:bg-slate-100"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <div className="mt-4 text-right">
            <button
              onClick={() => push("Preferences saved.")}
              className="inline-flex items-center rounded-xl px-4 py-2 text-white shadow
                         bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
