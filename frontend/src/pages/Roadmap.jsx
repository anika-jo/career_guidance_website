import React, { useState, useEffect } from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { CheckCircle2, Circle, ArrowRight, Play, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export default function Roadmap() {
    const { user } = useAuth();
    const [roadmap, setRoadmap] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRoadmap = async () => {
            if (!user?.targetCareer) {
                setLoading(false);
                return;
            }
            try {
                const data = await api.get(`/roadmap/${encodeURIComponent(user.targetCareer)}`);
                setRoadmap(data);
            } catch (error) {
                console.error("Failed to load roadmap:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRoadmap();
    }, [user?.targetCareer]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
            </div>
        );
    }

    if (!user?.targetCareer || !roadmap) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
                <div className="p-4 rounded-2xl bg-white/5 mb-6">
                    <Map className="w-12 h-12 text-slate-500" />
                </div>
                <h1 className="text-3xl font-display font-bold text-white mb-2">No Active Roadmap</h1>
                <p className="text-slate-400 max-w-md">You haven't selected a trajectory yet. Explore career paths to generate your personalized journey.</p>
                <Link to="/career" className="mt-8 px-8 py-3 rounded-full bg-primary text-white font-bold hover:bg-primary-hover transition-all">
                    Explore Careers
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-12 px-6 max-w-5xl mx-auto space-y-8">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-4xl font-display font-bold text-white">Interactive Roadmap</h1>
                    <p className="text-slate-400 mt-2 text-lg">Your step-by-step path to <span className="text-primary font-semibold">{user.targetCareer}</span></p>
                </div>
                <div className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold">
                    {roadmap.progress}% Completed
                </div>
            </header>

            <div className="space-y-12">
                {roadmap.phases.map((phase, idx) => (
                    <div key={phase.id} className="relative">
                        {idx !== roadmap.phases.length - 1 && (
                            <div className="absolute left-[23px] top-[60px] bottom-[-40px] w-0.5 bg-gradient-to-b from-primary/50 to-white/5" />
                        )}

                        <div className="flex gap-8 group">
                            <div className={`flex-shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${phase.status === 'completed' ? 'bg-primary border-primary shadow-[0_0_15px_rgba(99,102,241,0.4)]' :
                                phase.status === 'current' ? 'bg-background border-primary animate-pulse' : 'bg-background border-white/10'
                                }`}>
                                {phase.status === 'completed' ? (
                                    <CheckCircle2 className="w-6 h-6 text-white" />
                                ) : phase.status === 'current' ? (
                                    <div className="w-3 h-3 rounded-full bg-primary" />
                                ) : (
                                    <Circle className="w-6 h-6 text-white/10" />
                                )}
                            </div>

                            <div className="flex-grow pb-8">
                                <GlassCard className={`relative overflow-hidden ${phase.status === 'locked' ? 'opacity-60 grayscale' : ''}`}>
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-display font-bold text-white">{phase.name}</h3>
                                            <p className="text-sm text-slate-500 uppercase tracking-widest mt-1">Phase 0{idx + 1}</p>
                                        </div>
                                        {phase.status === 'current' && (
                                            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-hover transition-all">
                                                <Play className="w-3 h-3 fill-white" />
                                                Resume Activity
                                            </button>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                        {(phase.activities || []).map((activity, aIdx) => (
                                            <div key={aIdx} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all cursor-pointer">
                                                <h4 className="text-sm font-bold text-slate-300">{activity.title}</h4>
                                                <p className="text-xs text-slate-500 mt-1">{activity.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </GlassCard>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
