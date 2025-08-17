import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Star, 
  Building, 
  User,
  Target,
  TrendingUp,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

export default function MatchCard({ match, candidate, role, onStatusChange, onViewDetails }) {
  if (!candidate || !role) return null;

  const getScoreColor = (score) => {
    if (score >= 80) return 'from-green-500 to-emerald-500';
    if (score >= 60) return 'from-amber-500 to-yellow-500';
    return 'from-red-500 to-orange-500';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Fair';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'shortlisted': return 'bg-green-100 text-green-800 border-green-200';
      case 'interviewed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getCompetencyAlignment = () => {
    if (!match.competency_alignment) return 0;
    const values = Object.values(match.competency_alignment);
    return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="glass-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50/50 pb-4">
          <div className="flex items-start justify-between">
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-4">
                {/* Match Score Circle */}
                <div className="relative">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${getScoreColor(match.match_score)} flex items-center justify-center shadow-lg`}>
                    <div className="text-white font-bold text-lg">{match.match_score}%</div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
                    <Star className="w-3 h-3 text-amber-500" />
                  </div>
                </div>

                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                      {getScoreLabel(match.match_score)} Match
                    </Badge>
                    <Badge variant="outline" className={`border ${getStatusColor(match.status)}`}>
                      {match.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    {/* Candidate Info */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">
                          {candidate.first_name} {candidate.last_name}
                        </p>
                        <p className="text-sm text-slate-600">
                          {candidate.target_roles?.slice(0, 2).join(', ') || 'Executive'}
                        </p>
                      </div>
                    </div>

                    {/* Role Info */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center">
                        <Building className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{role.title}</p>
                        <p className="text-sm text-slate-600">
                          {role.company_name} • {role.stage}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Match Explanation */}
          {match.match_explanation && (
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-sm text-slate-700 leading-relaxed">
                {match.match_explanation}
              </p>
            </div>
          )}

          {/* Strengths and Gaps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {match.strengths?.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold text-green-700 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Key Strengths
                </h4>
                <div className="space-y-2">
                  {match.strengths.slice(0, 3).map((strength, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-slate-700">{strength}</span>
                    </div>
                  ))}
                  {match.strengths.length > 3 && (
                    <p className="text-xs text-slate-500 pl-4">
                      +{match.strengths.length - 3} more strengths
                    </p>
                  )}
                </div>
              </div>
            )}

            {match.gaps?.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold text-amber-700 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Development Areas
                </h4>
                <div className="space-y-2">
                  {match.gaps.slice(0, 3).map((gap, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-slate-700">{gap}</span>
                    </div>
                  ))}
                  {match.gaps.length > 3 && (
                    <p className="text-xs text-slate-500 pl-4">
                      +{match.gaps.length - 3} more areas
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Competency Alignment */}
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-800 flex items-center gap-2">
              <Target className="w-4 h-4" />
              Competency Alignment
              <span className="text-sm font-normal text-slate-600">
                ({getCompetencyAlignment()}/10 avg)
              </span>
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {match.competency_alignment && Object.entries(match.competency_alignment).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-600 capitalize">
                      {key.replace(/_/g, ' ')}
                    </span>
                    <span className="text-xs font-medium">{value}/10</span>
                  </div>
                  <Progress value={value * 10} className="h-2 rounded-full" />
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-200">
            <Button
              onClick={onViewDetails}
              variant="outline"
              className="flex-1 md:flex-none rounded-xl border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </Button>

            {match.status === 'pending' && (
              <>
                <Button
                  onClick={() => onStatusChange('shortlisted')}
                  className="flex-1 md:flex-none bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Shortlist
                </Button>
                <Button
                  onClick={() => onStatusChange('rejected')}
                  variant="outline"
                  className="flex-1 md:flex-none rounded-xl border-red-200 text-red-600 hover:bg-red-50"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Pass
                </Button>
              </>
            )}

            {match.status === 'shortlisted' && (
              <Button
                onClick={() => onStatusChange('interviewed')}
                className="flex-1 md:flex-none bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Move to Interview
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}