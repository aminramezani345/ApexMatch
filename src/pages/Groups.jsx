import React from "react";
import { Users, Plus } from "lucide-react";
import { useToast } from "../components/Toast.jsx";

export default function Groups() {
  const { push } = useToast();

  return (
    <div className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Community Groups</h1>
          <p className="text-slate-600">Connect with fellow executives and industry leaders</p>
        </div>
        <button
          onClick={() => push("Group creation coming soon.")}
          className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-white shadow
                     bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
        >
          <Plus className="h-4 w-4" />
          Create Group
        </button>
      </div>

      {/* empty/sample card */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-blue-600">
              <Users />
            </div>
            <div>
              <div className="font-semibold text-slate-900">Healthcare Executives</div>
              <div className="text-xs text-slate-500">Public · 143 members</div>
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-600">
            Discuss digital transformation, AI adoption, and scaling leadership teams in healthcare.
          </p>
          <div className="mt-4">
            <button
              onClick={() => push("Request to join sent.")}
              className="rounded-lg bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-800"
            >
              Request to Join
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
