import React, { useMemo, useState } from "react";
import { Star, CheckCircle2 } from "lucide-react";

const SAMPLE = [
  { id: 1, candidate: "Jordan Blake", role: "CTO", score: 86, status: "Shortlist" },
  { id: 2, candidate: "Avery Stone", role: "CFO", score: 74, status: "Review" },
  { id: 3, candidate: "Morgan Hale", role: "COO", score: 92, status: "Interview" },
];

export default function Matches() {
  const [filterRole, setFilterRole] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const rows = useMemo(() => {
    return SAMPLE.filter(r =>
      (filterRole === "All" || r.role === filterRole) &&
      (filterStatus === "All" || r.status === filterStatus)
    );
  }, [filterRole, filterStatus]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-extrabold text-slate-900">Match Intelligence</h1>
      <p className="text-slate-600">AI-powered candidate-role compatibility analysis</p>

      {/* filters */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)}
          className="rounded-lg border bg-white px-3 py-2 text-sm">
          {["All","CEO","CTO","CFO","COO","CMO","CPO","CHRO"].map((r) => <option key={r}>{r}</option>)}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-lg border bg-white px-3 py-2 text-sm">
          {["All","Shortlist","Interview","Review"].map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* table */}
      <div className="mt-4 overflow-hidden rounded-xl border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 text-left">Candidate</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Score</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="px-4 py-3">{r.candidate}</td>
                <td className="px-4 py-3">{r.role}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold
                    ${r.score >= 85 ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                                    : r.score >= 70 ? "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
                                                    : "bg-slate-100 text-slate-700 ring-1 ring-slate-200"}`}>
                    {r.score}%
                  </span>
                </td>
                <td className="px-4 py-3">
                  {r.status === "Shortlist" ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-2 py-1 text-xs text-white">
                      <Star className="h-3.5 w-3.5" /> {r.status}
                    </span>
                  ) : r.status === "Interview" ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-2 py-1 text-xs text-white">
                      <CheckCircle2 className="h-3.5 w-3.5" /> {r.status}
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-1 text-xs">
                      {r.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-slate-500">
                  No matches found with the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
