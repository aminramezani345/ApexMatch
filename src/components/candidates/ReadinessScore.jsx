import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Award, Target } from "lucide-react";

export default function ReadinessScore({ score, breakdown }) {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Executive Ready';
    if (score >= 60) return 'Nearly Ready';
    return 'In Development';
  };

  return (
    <Card className="glass-card border-0 shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 gradient-text">
          <Award className="w-5 h-5" />
          Readiness Assessment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className={`text-5xl font-bold ${getScoreColor(score)}`}>
            {score}%
          </div>
          <p className="text-slate-600 mt-2">{getScoreLabel(score)}</p>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Overall Progress</span>
            <span className="text-sm font-medium">{score}/100</span>
          </div>
          <Progress value={score} className="h-3 rounded-full" />
        </div>

        {breakdown && (
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <h4 className="font-medium text-slate-800">Score Breakdown</h4>
            {breakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-slate-600">{item.label}</span>
                <span className="text-sm font-medium text-blue-600">{item.value}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}