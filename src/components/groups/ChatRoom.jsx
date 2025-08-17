import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Send, Users, Hash, Globe, Lock } from "lucide-react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatRoom({ group, messages, currentUser, onSendMessage, onBack }) {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const getMessageTime = (timestamp) => {
    try {
      return format(new Date(timestamp), 'HH:mm');
    } catch (error) {
      return '';
    }
  };

  const getMessageDate = (timestamp) => {
    try {
      return format(new Date(timestamp), 'MMM d, yyyy');
    } catch (error) {
      return '';
    }
  };

  const groupMessagesByDate = (messages) => {
    const grouped = {};
    messages.forEach(message => {
      const date = getMessageDate(message.timestamp);
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(message);
    });
    return grouped;
  };

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/30">
      {/* Chat Header */}
      <Card className="glass-card border-0 shadow-lg rounded-t-none">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-teal-50 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="rounded-xl hover:bg-white/80"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            
            <div className="flex items-center gap-3 flex-1">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                <Hash className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-xl gradient-text flex items-center gap-2">
                  {group.name}
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
                </CardTitle>
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{group.member_count || 0} members</span>
                  </div>
                  {group.description && (
                    <span className="truncate max-w-md">{group.description}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Messages Area */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full p-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {Object.entries(groupedMessages).length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Hash className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold text-slate-700 mb-2">
                  Welcome to #{group.name}!
                </h3>
                <p className="text-slate-500 mb-4">
                  This is the beginning of your conversation in this group.
                </p>
                <p className="text-sm text-slate-400">
                  Start by sending a message below.
                </p>
              </motion.div>
            ) : (
              <AnimatePresence>
                {Object.entries(groupedMessages).map(([date, dateMessages]) => (
                  <div key={date} className="space-y-4">
                    {/* Date Separator */}
                    <div className="flex items-center gap-4 my-6">
                      <div className="flex-1 h-px bg-slate-200" />
                      <Badge variant="outline" className="bg-white text-slate-500 border-slate-200 px-3 py-1">
                        {date}
                      </Badge>
                      <div className="flex-1 h-px bg-slate-200" />
                    </div>

                    {/* Messages for this date */}
                    {dateMessages.map((message, index) => (
                      <motion.div
                        key={`${message.id || index}-${message.timestamp}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`flex gap-3 ${
                          message.user_name === (currentUser?.full_name || currentUser?.email)
                            ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        {message.user_name !== (currentUser?.full_name || currentUser?.email) && (
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                            <span className="text-white text-sm font-medium">
                              {message.user_name?.charAt(0).toUpperCase() || 'U'}
                            </span>
                          </div>
                        )}

                        <div className={`max-w-md ${
                          message.user_name === (currentUser?.full_name || currentUser?.email)
                            ? 'order-first' : ''
                        }`}>
                          <div className={`p-3 rounded-2xl shadow-sm ${
                            message.user_name === (currentUser?.full_name || currentUser?.email)
                              ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white'
                              : 'bg-white border border-slate-200'
                          }`}>
                            {message.user_name !== (currentUser?.full_name || currentUser?.email) && (
                              <p className="font-medium text-sm text-slate-600 mb-1">
                                {message.user_name}
                              </p>
                            )}
                            <p className={`text-sm leading-relaxed ${
                              message.user_name === (currentUser?.full_name || currentUser?.email)
                                ? 'text-white' : 'text-slate-700'
                            }`}>
                              {message.content}
                            </p>
                          </div>
                          <p className={`text-xs text-slate-400 mt-1 px-1 ${
                            message.user_name === (currentUser?.full_name || currentUser?.email)
                              ? 'text-right' : 'text-left'
                          }`}>
                            {getMessageTime(message.timestamp)}
                          </p>
                        </div>

                        {message.user_name === (currentUser?.full_name || currentUser?.email) && (
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                            <span className="text-white text-sm font-medium">
                              {message.user_name?.charAt(0).toUpperCase() || 'U'}
                            </span>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                ))}
              </AnimatePresence>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      {/* Message Input */}
      <Card className="glass-card border-0 shadow-lg rounded-b-none">
        <CardContent className="p-4">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <Input
              ref={inputRef}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Message #{group.name}...`}
              className="rounded-xl border-slate-200 focus:border-blue-500 flex-1"
              disabled={!currentUser}
            />
            <Button
              type="submit"
              disabled={!newMessage.trim() || !currentUser}
              className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-4 rounded-xl shadow-lg"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
          
          {!currentUser && (
            <p className="text-sm text-slate-500 mt-2 text-center">
              Please log in to participate in the conversation
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}