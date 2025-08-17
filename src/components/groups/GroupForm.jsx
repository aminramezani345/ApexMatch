import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Hash } from "lucide-react";
import { motion } from "framer-motion";

const GROUP_CATEGORIES = ["General", "Industry", "Role-specific", "Location", "Stage"];

export default function GroupForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "public",
    category: "General",
    member_count: 0,
    tags: []
  });
  const [newTag, setNewTag] = useState("");

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      <Card className="glass-card border-0 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-t-xl">
          <CardTitle className="text-2xl font-bold gradient-text flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
              <Hash className="w-6 h-6 text-white" />
            </div>
            Create New Group
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Group Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="rounded-xl border-slate-200 focus:border-blue-500"
                    placeholder="e.g., Tech CEOs Network"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {GROUP_CATEGORIES.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="rounded-xl border-slate-200 focus:border-blue-500 h-24"
                  placeholder="Describe what this group is about and who should join..."
                  required
                />
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800">Privacy & Access</h3>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div>
                  <Label htmlFor="type">Group Type</Label>
                  <p className="text-sm text-slate-600 mt-1">
                    {formData.type === 'public' 
                      ? 'Anyone can discover and join this group' 
                      : 'Only invited members can join this group'
                    }
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-sm ${formData.type === 'private' ? 'font-medium' : 'text-slate-500'}`}>
                    Private
                  </span>
                  <Switch
                    id="type"
                    checked={formData.type === 'public'}
                    onCheckedChange={(checked) => handleInputChange('type', checked ? 'public' : 'private')}
                  />
                  <span className={`text-sm ${formData.type === 'public' ? 'font-medium' : 'text-slate-500'}`}>
                    Public
                  </span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800">Tags</h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="rounded-xl flex-1"
                    placeholder="Add a tag (e.g., startup, fintech, leadership)"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addTag}
                    className="rounded-xl"
                    disabled={!newTag.trim()}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-blue-100 text-blue-800 border-blue-200 px-3 py-1 rounded-xl flex items-center gap-2"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="hover:text-blue-900 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Group Preview */}
            <div className="p-4 bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl border border-blue-200">
              <h4 className="font-semibold text-slate-800 mb-2">Preview</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
                    <Hash className="w-4 h-4 text-white" />
                  </div>
                  <h5 className="font-medium text-slate-800">
                    {formData.name || "Group Name"}
                  </h5>
                  <Badge variant="outline" className="text-xs">
                    {formData.type}
                  </Badge>
                  <Badge className="text-xs bg-slate-100 text-slate-700">
                    {formData.category}
                  </Badge>
                </div>
                <p className="text-sm text-slate-600 pl-10">
                  {formData.description || "Group description will appear here..."}
                </p>
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
                Create Group
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}