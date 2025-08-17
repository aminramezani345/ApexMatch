import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Target } from "lucide-react";

export default function MatchResults({ matches, candidates, role }) {
  const getMatchCandidate = (candidateId) => {
    return candidates.find(c => c.id === candidateId);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 60) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const sortedMatches = matches.sort((a, b) => (b.match_score || 0) - (a.match_score || 0));

  return (
    <Card className="glass-card border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 gradient-text">
          <Target className="w-5 h-5" />
          Match Results for {role.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sortedMatches.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <p>No matches generated yet</p>
          </div>
        ) : (
          sortedMatches.map((match) => {
            const candidate = getMatchCandidate(match.candidate_id);
            if (!candidate) return null;

            return (
              <div key={match.id} className="p-4 border border-slate-200 rounded-xl bg-white space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-slate-800">
                      {candidate.first_name} {candidate.last_name}
                    </h4>
                    <p className="text-sm text-slate-600">{candidate.email}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={`px-3 py-1 rounded-full border ${getScoreColor(match.match_score)}`}>
                      {match.match_score}% Match
                    </Badge>
                  </div>
                </div>

                {match.match_explanation && (
                  <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
                    {match.match_explanation}
                  </p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {match.strengths?.length > 0 && (
                    <div className="space-y-2">
                      <h5 className="font-medium text-green-700 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        Strengths
                      </h5>
                      <ul className="space-y-1">
                        {match.strengths.map((strength, index) => (
                          <li key={index} className="text-sm text-slate-600">• {strength}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {match.gaps?.length > 0 && (
                    <div className="space-y-2">
                      <h5 className="font-medium text-red-700 flex items-center gap-1">
                        <XCircle className="w-4 h-4" />
                        Development Areas
                      </h5>
                      <ul className="space-y-1">
                        {match.gaps.map((gap, index) => (
                          <li key={index} className="text-sm text-slate-600">• {gap}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}