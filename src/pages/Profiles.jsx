import React, { useState, useEffect } from 'react';
import { User } from '@/entities/User';
import { UploadFile } from '@/integrations/Core';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Loader2, Upload, UserCircle, FileText, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const TARGET_ROLES = ["CEO", "CTO", "CFO", "COO", "CMO", "CPO", "CHRO"];

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await User.me();
        setUser(currentUser);
      } catch (error) {
        console.error("Failed to fetch user", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    setFeedback({ message: '', type: '' });
    try {
      const { file_url } = await UploadFile({ file });
      await User.updateMyUserData({ cv_url: file_url });
      setUser(prev => ({ ...prev, cv_url: file_url }));
      setFeedback({ message: 'CV uploaded successfully!', type: 'success' });
    } catch (error) {
      console.error('Error uploading file:', error);
      setFeedback({ message: 'CV upload failed. Please try again.', type: 'error' });
    } finally {
      setUploading(false);
    }
  };

  const handleRoleToggle = (role) => {
    const currentRoles = user.target_roles || [];
    const newRoles = currentRoles.includes(role)
      ? currentRoles.filter(item => item !== role)
      : [...currentRoles, role];
    setUser(prev => ({ ...prev, target_roles: newRoles }));
  };

  const handleProfileUpdate = async () => {
    setLoading(true);
    setFeedback({ message: '', type: '' });
    try {
      await User.updateMyUserData({ target_roles: user.target_roles });
      setFeedback({ message: 'Profile updated successfully!', type: 'success' });
    } catch (error) {
      console.error('Error updating profile:', error);
      setFeedback({ message: 'Failed to update profile.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  if (loading && !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center p-12">
        <h2 className="text-2xl font-bold text-slate-700">Could not load user profile.</h2>
        <p className="text-slate-500">Please make sure you are logged in.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
            <UserCircle className="w-12 h-12 text-blue-600" />
            <div>
                <h1 className="text-4xl font-bold gradient-text">My Profile</h1>
                <p className="text-slate-600">Manage your personal information and preferences.</p>
            </div>
        </div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
          <Card className="glass-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>This information is managed by your login provider.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label>Full Name</Label>
                        <Input value={user.full_name} readOnly className="bg-slate-100" />
                    </div>
                    <div>
                        <Label>Email Address</Label>
                        <Input value={user.email} readOnly className="bg-slate-100" />
                    </div>
                </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-8"
        >
          <Card className="glass-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Professional Details</CardTitle>
              <CardDescription>Help us find the best matches for you by providing your CV and target roles.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                {/* CV Upload Section */}
                <div>
                    <Label className="text-lg font-semibold text-slate-800">Your CV</Label>
                    <div className="mt-2 border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-blue-300 transition-colors">
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileUpload}
                            className="hidden"
                            id="cv-upload-profile"
                            disabled={uploading}
                        />
                        <label htmlFor="cv-upload-profile" className="cursor-pointer">
                        {uploading ? (
                            <div className="flex items-center justify-center gap-2">
                                <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                                <span className="text-slate-600">Uploading...</span>
                            </div>
                        ) : user.cv_url ? (
                            <a href={user.cv_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-green-600 hover:text-green-700">
                                <FileText className="w-6 h-6" />
                                <span>CV Uploaded. Click to view or replace.</span>
                            </a>
                        ) : (
                            <div className="flex items-center justify-center gap-2 text-slate-500">
                                <Upload className="w-6 h-6" />
                                <span>Click to upload your CV</span>
                            </div>
                        )}
                        </label>
                    </div>
                </div>

                {/* Target Roles Section */}
                <div>
                    <Label className="text-lg font-semibold text-slate-800">Your Target C-Level Roles</Label>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {TARGET_ROLES.map(role => (
                        <Badge
                            key={role}
                            variant={user.target_roles?.includes(role) ? "default" : "outline"}
                            className={`cursor-pointer px-4 py-2 rounded-xl transition-all text-base ${
                            user.target_roles?.includes(role)
                                ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white hover:from-blue-600 hover:to-teal-600'
                                : 'hover:bg-slate-100'
                            }`}
                            onClick={() => handleRoleToggle(role)}
                        >
                            {role}
                        </Badge>
                        ))}
                    </div>
                </div>

                {/* Save Button & Feedback */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                     {feedback.message && (
                        <div className={`flex items-center gap-2 text-sm ${feedback.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                           <CheckCircle className="w-4 h-4" />
                           {feedback.message}
                        </div>
                    )}
                    <Button 
                        onClick={handleProfileUpdate}
                        disabled={loading}
                        className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-8 py-3 rounded-xl ml-auto"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save Changes'}
                    </Button>
                </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}