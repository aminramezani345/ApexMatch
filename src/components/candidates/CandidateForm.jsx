import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { UploadFile } from "@/integrations/Core";
import { Upload, X, Plus, Link as LinkIcon, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const TARGET_ROLES = ["CEO", "CTO", "CFO", "COO", "CMO", "CPO", "CHRO"];
const INDUSTRIES = ["Technology", "Healthcare", "Finance", "Retail", "Manufacturing", "Education", "Energy", "Real Estate"];
const STARTUP_STAGES = ["Pre-seed", "Seed", "Series A", "Series B", "Series C+", "IPO Ready"];

const COMPETENCIES = [
  { key: "strategic_planning", label: "Strategic Planning", icon: "🎯" },
  { key: "team_leadership", label: "Team Leadership", icon: "👥" },
  { key: "financial_acumen", label: "Financial Acumen", icon: "💰" },
  { key: "market_knowledge", label: "Market Knowledge", icon: "📊" },
  { key: "innovation", label: "Innovation", icon: "💡" },
  { key: "execution", label: "Execution", icon: "⚡" }
];

export default function CandidateForm({ candidate, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(candidate || {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    cv_url: "",
    target_roles: [],
    industries: [],
    startup_stages: [],
    competencies: {
      strategic_planning: 5,
      team_leadership: 5,
      financial_acumen: 5,
      market_knowledge: 5,
      innovation: 5,
      execution: 5
    },
    outcomes: [],
    readiness_score: 0
  });
  
  const [uploading, setUploading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayToggle = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field]?.includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...(prev[field] || []), value]
    }));
  };

  const handleCompetencyChange = (competency, value) => {
    setFormData(prev => ({
      ...prev,
      competencies: {
        ...prev.competencies,
        [competency]: value[0]
      }
    }));
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    setUploading(true);
    try {
      const { file_url } = await UploadFile({ file });
      handleInputChange('cv_url', file_url);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  };

  const addOutcome = () => {
    setFormData(prev => ({
      ...prev,
      outcomes: [...(prev.outcomes || []), { description: "", metrics: "", proof_url: "" }]
    }));
  };

  const updateOutcome = (index, field, value) => {
    setFormData(prev => {
      const outcomes = [...(prev.outcomes || [])];
      outcomes[index] = { ...outcomes[index], [field]: value };
      return { ...prev, outcomes };
    });
  };

  const removeOutcome = (index) => {
    setFormData(prev => ({
      ...prev,
      outcomes: prev.outcomes?.filter((_, i) => i !== index) || []
    }));
  };

  const calculateReadinessScore = () => {
    const competencyAvg = Object.values(formData.competencies || {}).reduce((a, b) => a + b, 0) / 6;
    const rolesWeight = (formData.target_roles?.length || 0) * 5;
    const industriesWeight = (formData.industries?.length || 0) * 3;
    const outcomesWeight = (formData.outcomes?.length || 0) * 10;
    const cvWeight = formData.cv_url ? 20 : 0;
    
    return Math.min(100, Math.round(competencyAvg * 5 + rolesWeight + industriesWeight + outcomesWeight + cvWeight));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = { ...formData, readiness_score: calculateReadinessScore() };
    onSubmit(finalData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      <Card className="glass-card border-0 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-t-xl">
          <CardTitle className="text-2xl font-bold gradient-text">
            {candidate ? 'Edit Candidate Profile' : 'Add New Candidate'}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    value={formData.first_name}
                    onChange={(e) => handleInputChange('first_name', e.target.value)}
                    className="rounded-xl border-slate-200 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    value={formData.last_name}
                    onChange={(e) => handleInputChange('last_name', e.target.value)}
                    className="rounded-xl border-slate-200 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="rounded-xl border-slate-200 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="rounded-xl border-slate-200 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* CV Upload */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800">CV Upload</h3>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-blue-300 transition-colors">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="cv-upload"
                />
                <label htmlFor="cv-upload" className="cursor-pointer">
                  {uploading ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                      <span className="text-slate-600">Uploading...</span>
                    </div>
                  ) : formData.cv_url ? (
                    <div className="flex items-center justify-center gap-2 text-green-600">
                      <Upload className="w-6 h-6" />
                      <span>CV Uploaded Successfully</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2 text-slate-500">
                      <Upload className="w-6 h-6" />
                      <span>Click to upload CV (PDF, DOC, DOCX)</span>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Target Roles */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800">Target C-Level Roles</h3>
              <div className="flex flex-wrap gap-2">
                {TARGET_ROLES.map(role => (
                  <Badge
                    key={role}
                    variant={formData.target_roles?.includes(role) ? "default" : "outline"}
                    className={`cursor-pointer px-4 py-2 rounded-xl transition-all ${
                      formData.target_roles?.includes(role)
                        ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white hover:from-blue-600 hover:to-teal-600'
                        : 'hover:bg-slate-100'
                    }`}
                    onClick={() => handleArrayToggle('target_roles', role)}
                  >
                    {role}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Industries */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800">Industries</h3>
              <div className="flex flex-wrap gap-2">
                {INDUSTRIES.map(industry => (
                  <Badge
                    key={industry}
                    variant={formData.industries?.includes(industry) ? "default" : "outline"}
                    className={`cursor-pointer px-4 py-2 rounded-xl transition-all ${
                      formData.industries?.includes(industry)
                        ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white hover:from-blue-600 hover:to-teal-600'
                        : 'hover:bg-slate-100'
                    }`}
                    onClick={() => handleArrayToggle('industries', industry)}
                  >
                    {industry}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Startup Stages */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800">Startup Stages</h3>
              <div className="flex flex-wrap gap-2">
                {STARTUP_STAGES.map(stage => (
                  <Badge
                    key={stage}
                    variant={formData.startup_stages?.includes(stage) ? "default" : "outline"}
                    className={`cursor-pointer px-4 py-2 rounded-xl transition-all ${
                      formData.startup_stages?.includes(stage)
                        ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white hover:from-blue-600 hover:to-teal-600'
                        : 'hover:bg-slate-100'
                    }`}
                    onClick={() => handleArrayToggle('startup_stages', stage)}
                  >
                    {stage}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Competencies */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-800">Core Competencies</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {COMPETENCIES.map(comp => (
                  <div key={comp.key} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="flex items-center gap-2">
                        <span className="text-lg">{comp.icon}</span>
                        {comp.label}
                      </Label>
                      <span className="font-semibold text-blue-600">
                        {formData.competencies?.[comp.key] || 5}/10
                      </span>
                    </div>
                    <Slider
                      value={[formData.competencies?.[comp.key] || 5]}
                      onValueChange={(value) => handleCompetencyChange(comp.key, value)}
                      max={10}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Outcomes */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-800">Measurable Outcomes</h3>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={addOutcome}
                  className="rounded-xl"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Outcome
                </Button>
              </div>
              
              <div className="space-y-4">
                {formData.outcomes?.map((outcome, index) => (
                  <div key={index} className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-slate-700">Outcome {index + 1}</h4>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeOutcome(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Input
                        placeholder="Outcome description"
                        value={outcome.description}
                        onChange={(e) => updateOutcome(index, 'description', e.target.value)}
                        className="rounded-xl"
                      />
                      <Input
                        placeholder="Metrics/Results"
                        value={outcome.metrics}
                        onChange={(e) => updateOutcome(index, 'metrics', e.target.value)}
                        className="rounded-xl"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <LinkIcon className="w-4 h-4 text-slate-400" />
                      <Input
                        placeholder="Proof URL (optional)"
                        value={outcome.proof_url}
                        onChange={(e) => updateOutcome(index, 'proof_url', e.target.value)}
                        className="rounded-xl"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Readiness Score Preview */}
            <div className="p-6 bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">Predicted Readiness Score</h3>
                  <p className="text-slate-600">Based on current profile completeness</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold gradient-text">{calculateReadinessScore()}%</div>
                  <div className="text-sm text-slate-500">Executive Ready</div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-4 pt-6 border-t border-slate-200">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                className="px-6 py-2 rounded-xl"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-6 py-2 rounded-xl"
              >
                {candidate ? 'Update' : 'Create'} Candidate
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}