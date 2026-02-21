import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GlassCard } from '../components/ui/GlassCard';
import { MatchScore } from '../components/dashboard/MatchScore';
import { MOCK_USER } from '../utils/mockData';
import { Brain, Rocket, Map, Settings, TrendingUp, CheckCircle2, Circle } from 'lucide-react';

export default function Dashboard() {
    const { user } = useAuth();

    if (!user) return null; // Or a loading skeleton

    return (
        <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto space-y-8">
            {/* Top Section: Welcome & Summary */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white">Welcome back, {user.name}</h1>
                    <p className="text-slate-400 mt-1">
                        Chasing: <span className="text-primary font-semibold">{user.targetCareer || 'Not Set'}</span>
                    </p>
                </div>
                <div className="flex gap-3">
                    <Link to="/roadmap" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary-hover text-white font-semibold transition-all">
                        <Rocket className="w-4 h-4" />
                        View Roadmap
                    </Link>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Stats & Goals */}
                <div className="lg:col-span-1 space-y-8">
                    <GlassCard className="flex flex-col items-center justify-center py-10">
                        <h3 className="text-lg font-semibold text-slate-300 mb-6">Career Match Score</h3>
                        <MatchScore score={user.matchScore || 0} />
                    </GlassCard>

                    <GlassCard>
                        <h3 className="text-lg font-semibold text-slate-300 mb-6 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-accent-blue" />
                            Skill Gap Indicator
                        </h3>
                        <div className="space-y-5">
                            {(user.skills || []).slice(0, 4).map((skill) => (
                                <div key={skill.name} className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-400">{skill.name}</span>
                                        <span className="text-slate-300 font-medium">{skill.level}% / {skill.required}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative">
                                        <div
                                            className="h-full bg-accent-blue rounded-full opacity-30 absolute top-0 left-0"
                                            style={{ width: `${skill.required}%` }}
                                        />
                                        <div
                                            className="h-full bg-primary rounded-full relative z-10"
                                            style={{ width: `${skill.level}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                            {(!user.skills || user.skills.length === 0) && (
                                <p className="text-sm text-slate-500 italic">No skill data available. Take the quiz to get started.</p>
                            )}
                        </div>
                    </GlassCard>
                </div>

                {/* Right Column: Roadmap & Actions */}
                <div className="lg:col-span-2 space-y-8">
                    <GlassCard>
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-lg font-semibold text-slate-300 flex items-center gap-2">
                                <Map className="w-5 h-5 text-accent-purple" />
                                Active Roadmap
                            </h3>
                            <Link to="/roadmap" className="text-sm font-semibold text-primary">View Full Path</Link>
                        </div>

                        <div className="relative pl-8 space-y-8 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-white/5">
                            {(user.activeRoadmap?.phases || []).map((phase) => (
                                <div key={phase.id} className="relative">
                                    <div className={`absolute -left-[32px] p-1 rounded-full border-2 ${phase.status === 'completed' ? 'bg-primary border-primary' :
                                        phase.status === 'current' ? 'bg-background border-primary' : 'bg-background border-white/10'
                                        }`}>
                                        {phase.status === 'completed' ? (
                                            <CheckCircle2 className="w-4 h-4 text-white" />
                                        ) : phase.status === 'current' ? (
                                            <div className="w-4 h-4 rounded-full bg-primary animate-pulse" />
                                        ) : (
                                            <Circle className="w-4 h-4 text-white/10" />
                                        )}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className={`font-semibold ${phase.status === 'locked' ? 'text-slate-500' : 'text-slate-200'
                                            }`}>{phase.name}</span>
                                        <span className="text-xs text-slate-500 uppercase tracking-tighter mt-0.5">
                                            {phase.status === 'completed' ? 'Achieved' : phase.status === 'current' ? 'In Progress' : 'Locked'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            {(!user.activeRoadmap || !user.activeRoadmap.phases) && (
                                <p className="text-sm text-slate-500 italic">No active roadmap. Complete the assessment to generate one.</p>
                            )}
                        </div>
                    </GlassCard>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Link to="/quiz" className="flex items-start gap-4 glass-morphism p-6 rounded-2xl hover:bg-white/[0.07] transition-colors cursor-pointer group">
                            <div className="p-3 rounded-xl bg-accent-purple/10 text-accent-purple group-hover:scale-110 transition-transform">
                                <Brain className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-white">Retake Quiz</h4>
                                <p className="text-sm text-slate-400 mt-1 text-balance">Refresh your profile scores based on current growth.</p>
                            </div>
                        </Link>

                        <GlassCard className="flex items-start gap-4 hover:bg-white/[0.07] transition-colors cursor-pointer group">
                            <div className="p-3 rounded-xl bg-accent-blue/10 text-accent-blue group-hover:scale-110 transition-transform">
                                <Settings className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-white">Update Status</h4>
                                <p className="text-sm text-slate-400 mt-1 text-balance">Log new certificates or projects to update roadmap.</p>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </div>
        </div>
    );
}
