import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Edit, MapPin, DollarSign, Users, Target, Zap, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function RoleCard({ role, matches, candidates, onEdit, onMatch, isMatching }) {
  const getTopMatches = () => {
    return matches
      .sort((a, b) => (b.match_score || 0) - (a.match_score || 0))
      .slice(0, 3);
  };

  const getMatchCandidate = (candidateId) => {
    return candidates.find(c => c.id === candidateId);
  };

  const getAverageMatchScore = () => {
    if (matches.length === 0) return 0;
    return Math.round(matches.reduce((sum, m) => sum + (m.match_score || 0), 0) / matches.length);
  };

  const formatSalary = (min, max) => {
    if (!min && !max) return 'Negotiable';
    if (min && max) return `$${(min / 1000).toFixed(0)}K - $${(max / 1000).toFixed(0)}K`;
    if (min) return `$${(min / 1000).toFixed(0)}K+`;
    return 'Competitive';
  };

  return (
    <Card className="glass-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50/50 pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
                {role.role_type}
              </Badge>
              <Badge variant="outline" className="border-teal-200 text-teal-700">
                {role.stage}
              </Badge>
            </div>
            <h3 className="text-xl font-bold text-slate-800">{role.title}</h3>
            <p className="text-slate-600">{role.company_name}</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onEdit}
              className="hover:bg-white/80 rounded-lg"
            >
              <Edit className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Role Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-600">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">
                {role.location || 'Location TBD'}
                {role.remote_ok && (
                  <Badge variant="outline" className="ml-2 text-xs border-green-200 text-green-700">
                    Remote OK
                  </Badge>
                )}
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <DollarSign className="w-4 h-4" />
              <span className="text-sm">{formatSalary(role.compensation_min, role.compensation_max)}</span>
              {role.equity_range && (
                <Badge variant="outline" className="ml-2 text-xs">
                  {role.equity_range} equity
                </Badge>
              )}
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-600">
              <Target className="w-4 h-4" />
              <span className="text-sm font-medium">{role.industry}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Users className="w-4 h-4" />
              <span className="text-sm">{matches.length} candidate{matches.length !== 1 ? 's' : ''} matched</span>
            </div>
          </div>
        </div>

        {/* Key Requirements */}
        {role.key_requirements?.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-slate-800">Key Requirements</h4>
            <div className="space-y-1">
              {role.key_requirements.slice(0, 3).map((req, index) => (
                <p key={index} className="text-sm text-slate-600">• {req}</p>
              ))}
              {role.key_requirements.length > 3 && (
                <p className="text-sm text-slate-500">+ {role.key_requirements.length - 3} more requirements</p>
              )}
            </div>
          </div>
        )}

        {/* Match Results */}
        {matches.length > 0 ? (
          <div className="space-y-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-slate-800">Match Results</h4>
              <div className="text-right">
                <div className="text-lg font-bold text-emerald-600">{getAverageMatchScore()}%</div>
                <div className="text-xs text-slate-500">Avg Score</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm text-slate-600 mb-2">Top Matches:</div>
              {getTopMatches().map((match, index) => {
                const candidate = getMatchCandidate(match.candidate_id);
                return (
                  <div key={match.id} className="flex items-center justify-between p-2 bg-white rounded-lg border">
                    <div>
                      <p className="font-medium text-sm">
                        {candidate?.first_name} {candidate?.last_name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {candidate?.target_roles?.join(', ')}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-emerald-600">
                        {match.match_score}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <Button
              onClick={onMatch}
              disabled={isMatching || candidates.length === 0}
              className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-6 py-2 rounded-xl"
            >
              {isMatching ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Finding Matches...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Generate Matches
                </>
              )}
            </Button>
            {candidates.length === 0 && (
              <p className="text-sm text-slate-500 mt-2">No candidates available to match</p>
            )}
          </div>
        )}

        {/* KPIs Preview */}
        {role.kpis?.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-slate-800">Success Metrics</h4>
            <div className="space-y-1">
              {role.kpis.slice(0, 2).map((kpi, index) => (
                <div key={index} className="text-sm">
                  <span className="font-medium text-slate-700">{kpi.metric}:</span>
                  <span className="text-slate-600 ml-1">{kpi.target}</span>
                </div>
              ))}
              {role.kpis.length > 2 && (
                <p className="text-sm text-slate-500">+ {role.kpis.length - 2} more KPIs</p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}