import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Mail, Phone, FileText, Target, Building, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function CandidateCard({ candidate, onEdit }) {
  const getReadinessColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 60) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getReadinessLabel = (score) => {
    if (score >= 80) return 'Executive Ready';
    if (score >= 60) return 'Nearly Ready';
    return 'In Development';
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="glass-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50/50 pb-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-800">
                {candidate.first_name} {candidate.last_name}
              </h3>
              <div className="flex items-center gap-2 text-slate-600">
                {candidate.email && (
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{candidate.email}</span>
                  </div>
                )}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(candidate)}
              className="hover:bg-white/80 rounded-lg"
            >
              <Edit className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Readiness Score */}
          <div className="flex items-center justify-between p-4 rounded-xl border bg-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-slate-800">Readiness Score</p>
                <p className={`text-sm px-2 py-1 rounded-full border ${getReadinessColor(candidate.readiness_score || 0)}`}>
                  {getReadinessLabel(candidate.readiness_score || 0)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold gradient-text">
                {candidate.readiness_score || 0}%
              </div>
            </div>
          </div>

          {/* Target Roles */}
          {candidate.target_roles?.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-600">
                <Target className="w-4 h-4" />
                <span className="text-sm font-medium">Target Roles</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {candidate.target_roles.slice(0, 3).map(role => (
                  <Badge key={role} variant="secondary" className="text-xs bg-blue-100 text-blue-800 border-blue-200">
                    {role}
                  </Badge>
                ))}
                {candidate.target_roles.length > 3 && (
                  <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-600">
                    +{candidate.target_roles.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Industries */}
          {candidate.industries?.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-600">
                <Building className="w-4 h-4" />
                <span className="text-sm font-medium">Industries</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {candidate.industries.slice(0, 2).map(industry => (
                  <Badge key={industry} variant="outline" className="text-xs border-teal-200 text-teal-700">
                    {industry}
                  </Badge>
                ))}
                {candidate.industries.length > 2 && (
                  <Badge variant="outline" className="text-xs border-slate-200 text-slate-600">
                    +{candidate.industries.length - 2} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* CV Status */}
          <div className="flex items-center gap-2 text-slate-600">
            <FileText className="w-4 h-4" />
            <span className="text-sm">
              {candidate.cv_url ? (
                <a 
                  href={candidate.cv_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  View CV
                </a>
              ) : (
                <span className="text-slate-500">No CV uploaded</span>
              )}
            </span>
          </div>

          {/* Outcomes Count */}
          {candidate.outcomes?.length > 0 && (
            <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
              <p className="text-sm font-medium text-green-800">
                {candidate.outcomes.length} Measurable Outcome{candidate.outcomes.length !== 1 ? 's' : ''} Documented
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}