import React, { useEffect, useState } from 'react';
import { Loader2, Award, ArrowRight, BookOpen, User } from 'lucide-react';

export default function Dashboard() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('http://localhost:8000/api/profile/me', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                setProfile(data);
            } catch (err) {
                console.error("Error fetching profile:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (loading) return (
        <div className="flex h-screen items-center justify-center bg-white">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
    );

    return (
        <div className="min-h-screen bg-white text-slate-900 pt-20 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-12 border-b border-slate-100 pb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">
                            Welcome back, <span className="text-primary">{profile?.name}</span>
                        </h1>
                        <p className="text-slate-500 mt-1">Track your career journey and milestones.</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-violet-100 flex items-center justify-center">
                        <User className="text-accent w-6 h-6" />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Career Result Card */}
                    <div className="lg:col-span-2 bg-slate-50 border border-slate-200 rounded-3xl p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Award className="text-primary w-6 h-6" />
                            </div>
                            <h2 className="text-xl font-bold">Top Match</h2>
                        </div>

                        {profile?.recommendations ? (
                            <div className="space-y-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-4xl font-black text-slate-900 leading-tight">
                                            {profile.recommendations[0]?.title}
                                        </h3>
                                        <p className="text-lg text-slate-600 mt-2">{profile.recommendations[0]?.industry}</p>
                                    </div>
                                    <div className="bg-white px-4 py-2 rounded-full border border-blue-200 shadow-sm">
                                        <span className="text-primary font-bold text-lg">{profile.score}% Match</span>
                                    </div>
                                </div>

                                {/* Match Progress Bar */}
                                <div className="space-y-2">
                                    <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000"
                                            style={{ width: `${profile.score}%` }}
                                        />
                                    </div>
                                </div>

                                <button className="mt-4 flex items-center gap-2 text-primary font-bold hover:underline">
                                    View Full Roadmap <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <div className="text-center py-10">
                                <p className="text-slate-400 italic">No assessment data found.</p>
                                <button className="mt-4 bg-primary text-white px-6 py-2 rounded-full font-bold">Take Quiz</button>
                            </div>
                        )}
                    </div>

                    {/* Sidebar / Quick Stats */}
                    <div className="space-y-6">
                        <div className="bg-violet-50 border border-violet-100 rounded-3xl p-6">
                            <h3 className="font-bold text-violet-900 mb-4 flex items-center gap-2">
                                <BookOpen className="w-5 h-5" /> Learning Path
                            </h3>
                            <p className="text-sm text-violet-700 leading-relaxed">
                                Based on your profile, we recommend starting with <b>Advanced SQL</b> and <b>UI Principles</b>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}