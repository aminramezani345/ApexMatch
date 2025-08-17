import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

export default function CompetencyRadar({ candidateCompetencies, roleRequirements, title }) {
  const competencyLabels = {
    strategic_planning: 'Strategic Planning',
    team_leadership: 'Team Leadership',
    financial_acumen: 'Financial Acumen',
    market_knowledge: 'Market Knowledge',
    innovation: 'Innovation',
    execution: 'Execution'
  };

  const data = Object.keys(competencyLabels).map(key => ({
    competency: competencyLabels[key],
    candidate: candidateCompetencies?.[key] || 0,
    required: roleRequirements?.[key] || 0,
    fullMark: 10
  }));

  return (
    <Card className="border border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="competency" tick={{ fontSize: 12 }} />
            <PolarRadiusAxis angle={90} domain={[0, 10]} tick={{ fontSize: 10 }} />
            <Radar
              name="Candidate"
              dataKey="candidate"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.1}
              strokeWidth={2}
            />
            <Radar
              name="Required"
              dataKey="required"
              stroke="#0d9488"
              fill="#0d9488"
              fillOpacity={0.1}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full" />
            <span className="text-sm text-slate-600">Candidate Level</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-teal-500 rounded-full" />
            <span className="text-sm text-slate-600">Required Level</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}