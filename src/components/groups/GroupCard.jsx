import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, MessageSquare, Globe, Lock, Hash } from "lucide-react";
import { motion } from "framer-motion";

export default function GroupCard({ group, messageCount, onClick }) {
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Industry': return '🏢';
      case 'Role-specific': return '👔';
      case 'Location': return '📍';
      case 'Stage': return '🚀';
      default: return '💬';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Industry': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Role-specific': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Location': return 'bg-green-100 text-green-800 border-green-200';
      case 'Stage': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className="glass-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
        onClick={onClick}
      >
        <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50/50 pb-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Hash className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-800 line-clamp-1">
                    {group.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    {group.type === 'public' ? (
                      <Badge variant="outline" className="text-xs border-green-200 text-green-700">
                        <Globe className="w-3 h-3 mr-1" />
                        Public
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs border-amber-200 text-amber-700">
                        <Lock className="w-3 h-3 mr-1" />
                        Private
                      </Badge>
                    )}
                    <Badge className={`text-xs border ${getCategoryColor(group.category)}`}>
                      <span className="mr-1">{getCategoryIcon(group.category)}</span>
                      {group.category}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-4">
          {/* Description */}
          <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
            {group.description || "Join this community to connect with like-minded executives and industry professionals."}
          </p>

          {/* Tags */}
          {group.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {group.tags.slice(0, 4).map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                  {tag}
                </Badge>
              ))}
              {group.tags.length > 4 && (
                <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-600">
                  +{group.tags.length - 4} more
                </Badge>
              )}
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Members</p>
                <p className="font-semibold text-slate-800">{group.member_count || 0}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-100 to-teal-200 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-teal-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Messages</p>
                <p className="font-semibold text-slate-800">{messageCount}</p>
              </div>
            </div>
          </div>

          {/* Activity Indicator */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${messageCount > 0 ? 'bg-green-500' : 'bg-slate-300'}`} />
              <span className="text-xs text-slate-500">
                {messageCount > 0 ? 'Active community' : 'Getting started'}
              </span>
            </div>
            <div className="text-xs text-slate-400">
              Click to join
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}