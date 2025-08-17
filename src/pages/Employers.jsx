import React from "react";
import { Plus, Building2, Target, Users, Search } from "lucide-react";
import { useToast } from "../components/Toast.jsx";

export default function Employers() {
  const { push } = useToast();

  return (
    <div className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Role Management</h1>
          <p className="text-slate-600">Create roles and find the perfect C-level matches</p>
        </div>
        <button
          onClick={() => push("Role creation coming soon.")}
          className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-white shadow
                     bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
        >
          <Plus className="h-4 w-4" />
          Add Role
        </button>
      </div>

      {/* metrics */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Metric icon={<Building2 />} label="Active Roles" value="0" />
        <Metric icon={<Users />} label="Candidates" value="0" />
        <Metric icon={<Target />} label="Avg Match Score" value="0%" />
        <Metric icon={<Search />} label="Searches" value="0" />
        <Metric icon={<Users />} label="Total Matches" value="0" />
      </div>

      {/* empty state */}
      <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border bg-white p-12 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
          <Building2 className="h-8 w-8 text-blue-600" />
        </div>
        <h3 className="mt-6 text-xl font-semibold">No roles yet</h3>
        <p className="mt-2 max-w-md text-slate-600">
          Create your first C-level role to start matching candidates with your requirements.
        </p>
        <button
          onClick={() => push("Role creation coming soon.")}
          className="mt-6 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-white shadow
                     bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
        >
          <Plus className="h-4 w-4" />
          Create First Role
        </button>
      </div>
    </div>
  );
}

function Metric({ icon, label, value }) {
  return (
    <div className="rounded-xl border bg-white p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-blue-600">
          {icon}
        </div>
        <div>
          <div className="text-sm text-slate-500">{label}</div>
          <div className="text-lg font-semibold text-slate-900">{value}</div>
        </div>
      </div>
    </div>
  );
}
