import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Plus, X, DollarSign, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";

const ROLE_TYPES = ["CEO", "CTO", "CFO", "COO", "CMO", "CPO", "CHRO"];
const INDUSTRIES = ["Technology", "Healthcare", "Finance", "Retail", "Manufacturing", "Education", "Energy", "Real Estate"];
const STARTUP_STAGES = ["Pre-seed", "Seed", "Series A", "Series B", "Series C+", "IPO Ready"];
const AVAILABILITY_OPTIONS = ["Immediate", "1-2 months", "3-6 months", "6+ months"];

const COMPETENCIES = [
  { key: "strategic_planning", label: "Strategic Planning", icon: "🎯" },
  { key: "team_leadership", label: "Team Leadership", icon: "👥" },
  { key: "financial_acumen", label: "Financial Acumen", icon: "💰" },
  { key: "market_knowledge", label: "Market Knowledge", icon: "📊" },
  { key: "innovation", label: "Innovation", icon: "💡" },
  { key: "execution", label: "Execution", icon: "⚡" }
];

export default function RoleForm({ role, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(role || {
    title: "",
    role_type: "",
    company_name: "",
    industry: "",
    stage: "",
    location: "",
    remote_ok: false,
    compensation_min: 0,
    compensation_max: 0,
    equity_range: "",
    key_requirements: [],
    kpis: [],
    required_competencies: {
      strategic_planning: 5,
      team_leadership: 5,
      financial_acumen: 5,
      market_knowledge: 5,
      innovation: 5,
      execution: 5
    },
    availability: ""
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCompetencyChange = (competency, value) => {
    setFormData(prev => ({
      ...prev,
      required_competencies: {
        ...prev.required_competencies,
        [competency]: value[0]
      }
    }));
  };

  const addRequirement = () => {
    setFormData(prev => ({
      ...prev,
      key_requirements: [...(prev.key_requirements || []), ""]
    }));
  };

  const updateRequirement = (index, value) => {
    setFormData(prev => {
      const requirements = [...(prev.key_requirements || [])];
      requirements[index] = value;
      return { ...prev, key_requirements: requirements };
    });
  };

  const removeRequirement = (index) => {
    setFormData(prev => ({
      ...prev,
      key_requirements: prev.key_requirements?.filter((_, i) => i !== index) || []
    }));
  };

  const addKPI = () => {
    setFormData(prev => ({
      ...prev,
      kpis: [...(prev.kpis || []), { metric: "", target: "" }]
    }));
  };

  const updateKPI = (index, field, value) => {
    setFormData(prev => {
      const kpis = [...(prev.kpis || [])];
      kpis[index] = { ...kpis[index], [field]: value };
      return { ...prev, kpis };
    });
  };

  const removeKPI = (index) => {
    setFormData(prev => ({
      ...prev,
      kpis: prev.kpis?.filter((_, i) => i !== index) || []
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
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
            {role ? 'Edit Role' : 'Create New Role'}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800">Role Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Role Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="rounded-xl border-slate-200 focus:border-blue-500"
                    placeholder="e.g., Chief Technology Officer"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role_type">Role Type</Label>
                  <Select value={formData.role_type} onValueChange={(value) => handleInputChange('role_type', value)}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select role type" />
                    </SelectTrigger>
                    <SelectContent>
                      {ROLE_TYPES.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company_name">Company Name</Label>
                  <Input
                    id="company_name"
                    value={formData.company_name}
                    onChange={(e) => handleInputChange('company_name', e.target.value)}
                    className="rounded-xl border-slate-200 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {INDUSTRIES.map(industry => (
                        <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stage">Company Stage</Label>
                  <Select value={formData.stage} onValueChange={(value) => handleInputChange('stage', value)}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select stage" />
                    </SelectTrigger>
                    <SelectContent>
                      {STARTUP_STAGES.map(stage => (
                        <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="availability">Availability</Label>
                  <Select value={formData.availability} onValueChange={(value) => handleInputChange('availability', value)}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="When to start?" />
                    </SelectTrigger>
                    <SelectContent>
                      {AVAILABILITY_OPTIONS.map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Location & Remote */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Location & Work Arrangement
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="rounded-xl border-slate-200 focus:border-blue-500"
                    placeholder="e.g., San Francisco, CA"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="remote_ok">Remote Work Allowed</Label>
                    <Switch
                      id="remote_ok"
                      checked={formData.remote_ok}
                      onCheckedChange={(checked) => handleInputChange('remote_ok', checked)}
                    />
                  </div>
                  <p className="text-sm text-slate-500">
                    {formData.remote_ok ? 'Remote work is allowed' : 'On-site presence required'}
                  </p>
                </div>
              </div>
            </div>

            {/* Compensation */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Compensation Package
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="compensation_min">Base Salary Min ($)</Label>
                  <Input
                    id="compensation_min"
                    type="number"
                    value={formData.compensation_min}
                    onChange={(e) => handleInputChange('compensation_min', parseInt(e.target.value) || 0)}
                    className="rounded-xl border-slate-200 focus:border-blue-500"
                    placeholder="200000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="compensation_max">Base Salary Max ($)</Label>
                  <Input
                    id="compensation_max"
                    type="number"
                    value={formData.compensation_max}
                    onChange={(e) => handleInputChange('compensation_max', parseInt(e.target.value) || 0)}
                    className="rounded-xl border-slate-200 focus:border-blue-500"
                    placeholder="350000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="equity_range">Equity Range</Label>
                  <Input
                    id="equity_range"
                    value={formData.equity_range}
                    onChange={(e) => handleInputChange('equity_range', e.target.value)}
                    className="rounded-xl border-slate-200 focus:border-blue-500"
                    placeholder="0.5% - 2.0%"
                  />
                </div>
              </div>
            </div>

            {/* Key Requirements */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-800">Key Requirements</h3>
                <Button type="button" variant="outline" size="sm" onClick={addRequirement} className="rounded-xl">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Requirement
                </Button>
              </div>
              <div className="space-y-3">
                {formData.key_requirements?.map((req, index) => (
                  <div key={index} className="flex gap-3 items-center">
                    <Input
                      value={req}
                      onChange={(e) => updateRequirement(index, e.target.value)}
                      className="rounded-xl flex-1"
                      placeholder="e.g., 10+ years of engineering leadership experience"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeRequirement(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* KPIs */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-800">Key Performance Indicators</h3>
                <Button type="button" variant="outline" size="sm" onClick={addKPI} className="rounded-xl">
                  <Plus className="w-4 h-4 mr-2" />
                  Add KPI
                </Button>
              </div>
              <div className="space-y-3">
                {formData.kpis?.map((kpi, index) => (
                  <div key={index} className="flex gap-3 items-center">
                    <Input
                      value={kpi.metric}
                      onChange={(e) => updateKPI(index, 'metric', e.target.value)}
                      className="rounded-xl flex-1"
                      placeholder="Metric name (e.g., Team Growth)"
                    />
                    <Input
                      value={kpi.target}
                      onChange={(e) => updateKPI(index, 'target', e.target.value)}
                      className="rounded-xl flex-1"
                      placeholder="Target (e.g., Grow team from 10 to 50)"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeKPI(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Required Competencies */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-800">Required Competency Levels</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {COMPETENCIES.map(comp => (
                  <div key={comp.key} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="flex items-center gap-2">
                        <span className="text-lg">{comp.icon}</span>
                        {comp.label}
                      </Label>
                      <span className="font-semibold text-blue-600">
                        {formData.required_competencies?.[comp.key] || 5}/10
                      </span>
                    </div>
                    <Slider
                      value={[formData.required_competencies?.[comp.key] || 5]}
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
                {role ? 'Update' : 'Create'} Role
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}