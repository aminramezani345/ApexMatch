import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  X, 
  CheckCircle, 
  XCircle, 
  User, 
  Building, 
  Mail, 
  Phone, 
  MapPin,
  DollarSign,
  Target,
  Star,
  FileText
} from "lucide-react";
import { motion } from "framer-motion";

export default function MatchDetails({ match, candidate, role, onClose, onStatusChange }) {
  if (!match || !candidate || !role) return null;

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 60) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const formatSalary = (min, max) => {
    if (!min && !max) return 'Negotiable';
    if (min && max) return `$${(min / 1000).toFixed(0)}K - $${(max / 1000).toFixed(0)}K`;
    if (min) return `$${(min / 1000).toFixed(0)}K+`;
    return 'Competitive';
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-6xl max-h-[90vh] overflow-y-auto"
      >
        <Card className="glass-card border-0 shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-t-xl">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold gradient-text">Match Analysis</CardTitle>
              <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                <X className="w-5 h-5" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-8">
            {/* Match Score Header */}
            <div className="text-center p-6 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border">
              <div className="inline-flex items-center gap-4">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${
                  match.match_score >= 80 ? 'from-green-500 to-emerald-500' :
                  match.match_score >= 60 ? 'from-amber-500 to-yellow-500' :
                  'from-red-500 to-orange-500'
                } flex items-center justify-center shadow-lg`}>
                  <div className="text-white font-bold text-2xl">{match.match_score}%</div>
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-slate-800">
                    {match.match_score >= 80 ? 'Excellent' :
                     match.match_score >= 60 ? 'Good' : 'Fair'} Match
                  </h3>
                  <p className="text-slate-600">Compatibility Score</p>
                </div>
              </div>
            </div>

            {/* Candidate & Role Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Candidate Card */}
              <Card className="border border-slate-200">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    Candidate Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div>
                    <h4 className="font-bold text-lg text-slate-800">
                      {candidate.first_name} {candidate.last_name}
                    </h4>
                    <div className="flex items-center gap-2 text-slate-600 mt-1">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">{candidate.email}</span>
                    </div>
                    {candidate.phone && (
                      <div className="flex items-center gap-2 text-slate-600 mt-1">
                        <Phone className="w-4 h-4" />
                        <span className="text-sm">{candidate.phone}</span>
                      </div>
                    )}
                  </div>

                  {candidate.target_roles?.length > 0 && (
                    <div>
                      <p className="font-medium text-slate-700 mb-2">Target Roles</p>
                      <div className="flex flex-wrap gap-1">
                        {candidate.target_roles.map(role => (
                          <Badge key={role} variant="secondary" className="text-xs bg-purple-100 text-purple-800">
                            {role}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {candidate.industries?.length > 0 && (
                    <div>
                      <p className="font-medium text-slate-700 mb-2">Industries</p>
                      <div className="flex flex-wrap gap-1">
                        {candidate.industries.map(industry => (
                          <Badge key={industry} variant="outline" className="text-xs">
                            {industry}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-2 border-t border-slate-200">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-amber-500" />
                      <span className="font-medium text-slate-700">Readiness Score:</span>
                      <span className="font-bold text-amber-600">
                        {candidate.readiness_score || 0}%
                      </span>
                    </div>
                  </div>

                  {candidate.cv_url && (
                    <div className="pt-2">
                      <a 
                        href={candidate.cv_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                      >
                        <FileText className="w-4 h-4" />
                        View CV
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Role Card */}
              <Card className="border border-slate-200">
                <CardHeader className="bg-gradient-to-r from-teal-50 to-blue-50">
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center">
                      <Building className="w-5 h-5 text-white" />
                    </div>
                    Role Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div>
                    <h4 className="font-bold text-lg text-slate-800">{role.title}</h4>
                    <p className="text-slate-600">{role.company_name}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge className="bg-blue-100 text-blue-800">{role.role_type}</Badge>
                      <Badge variant="outline">{role.stage}</Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {role.location && (
                      <div className="flex items-center gap-2 text-slate-600">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{role.location}</span>
                        {role.remote_ok && (
                          <Badge variant="outline" className="text-xs border-green-200 text-green-700">
                            Remote OK
                          </Badge>
                        )}
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2 text-slate-600">
                      <DollarSign className="w-4 h-4" />
                      <span className="text-sm">
                        {formatSalary(role.compensation_min, role.compensation_max)}
                      </span>
                      {role.equity_range && (
                        <Badge variant="outline" className="text-xs">
                          {role.equity_range}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-slate-600">
                      <Target className="w-4 h-4" />
                      <span className="text-sm font-medium">{role.industry}</span>
                    </div>
                  </div>

                  {role.key_requirements?.length > 0 && (
                    <div>
                      <p className="font-medium text-slate-700 mb-2">Key Requirements</p>
                      <div className="space-y-1">
                        {role.key_requirements.slice(0, 3).map((req, index) => (
                          <p key={index} className="text-sm text-slate-600">• {req}</p>
                        ))}
                        {role.key_requirements.length > 3 && (
                          <p className="text-sm text-slate-500">
                            +{role.key_requirements.length - 3} more requirements
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Match Explanation */}
            {match.match_explanation && (
              <Card className="border border-slate-200">
                <CardHeader>
                  <CardTitle className="text-lg">AI Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 leading-relaxed">{match.match_explanation}</p>
                </CardContent>
              </Card>
            )}

            {/* Detailed Strengths and Gaps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {match.strengths?.length > 0 && (
                <Card className="border border-green-200 bg-green-50/50">
                  <CardHeader>
                    <CardTitle className="text-lg text-green-800 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Key Strengths ({match.strengths.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {match.strengths.map((strength, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                          <p className="text-slate-700">{strength}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {match.gaps?.length > 0 && (
                <Card className="border border-amber-200 bg-amber-50/50">
                  <CardHeader>
                    <CardTitle className="text-lg text-amber-800 flex items-center gap-2">
                      <XCircle className="w-5 h-5" />
                      Development Areas ({match.gaps.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {match.gaps.map((gap, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                          <p className="text-slate-700">{gap}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Competency Detailed Analysis */}
            {match.competency_alignment && (
              <Card className="border border-slate-200">
                <CardHeader>
                  <CardTitle className="text-lg">Competency Alignment Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(match.competency_alignment).map(([key, value]) => (
                      <div key={key} className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="font-medium capitalize text-slate-700">
                            {key.replace(/_/g, ' ')}
                          </span>
                          <span className="font-bold text-slate-800">{value}/10</span>
                        </div>
                        <Progress value={value * 10} className="h-3 rounded-full" />
                        <div className="text-xs text-slate-500">
                          {value >= 8 ? 'Excellent alignment' :
                           value >= 6 ? 'Good alignment' :
                           value >= 4 ? 'Moderate alignment' : 'Development needed'}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-6 border-t border-slate-200">
              <Button variant="outline" onClick={onClose} className="px-6 rounded-xl">
                Close
              </Button>
              
              {match.status === 'pending' && (
                <>
                  <Button
                    onClick={() => onStatusChange('shortlisted')}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 rounded-xl"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Shortlist Candidate
                  </Button>
                  <Button
                    onClick={() => onStatusChange('rejected')}
                    variant="outline"
                    className="px-6 rounded-xl border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Pass
                  </Button>
                </>
              )}

              {match.status === 'shortlisted' && (
                <Button
                  onClick={() => onStatusChange('interviewed')}
                  className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 rounded-xl"
                >
                  Move to Interview
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}