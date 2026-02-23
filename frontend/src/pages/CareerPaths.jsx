import React, { useState, useEffect } from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { Rocket, Shield, Map, Zap, CheckCircle, Loader2 } from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { useNavigate } from 'react-router-dom';

const ICON_MAP = {
    Rocket: Rocket,
    Shield: Shield,
    Zap: Zap,
    Map: Map
};

export default function CareerPaths() {
    const [paths, setPaths] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selecting, setSelecting] = useState(null);
    const { updateProfile } = useAuth();
    const { showNotification } = useNotifications();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPaths = async () => {
            try {
                const data = await api.get('/careers/recommendations');
                setPaths(data);
            } catch (error) {
                showNotification("Could not load recommendations.", "error");
            } finally {
                setLoading(false);
            }
        };
        fetchPaths();
    }, []);

    const handleSelectPath = async (path) => {
        setSelecting(path.role);
        try {
            await updateProfile({ targetCareer: path.role });
            showNotification(`Roadmap for ${path.role} is now active!`, "success");
            navigate('/roadmap');
        } catch (error) {
            showNotification("Failed to update career path.", "error");
        } finally {
            setSelecting(null);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
            </div>
        );
    }

    return (
        <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto space-y-8">
            <header>
                <h1 className="text-4xl font-display font-bold text-white">Recommended Career Paths</h1>
                <p className="text-slate-400 mt-2 text-lg">AI-ranked opportunities based on your latest skill assessment.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {paths.map((path) => {
                    const Icon = ICON_MAP[path.icon] || Rocket;
                    return (
                        <GlassCard key={path.role} className="flex flex-col h-full hover:border-white/20 transition-all group">
                            <div className="flex justify-between items-start mb-6">
                                <div className={`p-3 rounded-xl bg-white/5 ${path.color || 'text-primary'}`}>
                                    <Icon className="w-8 h-8" />
                                </div>
                                <div className="text-right">
                                    <span className="text-2xl font-bold text-white">{path.match}%</span>
                                    <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Match Score</p>
                                </div>
                            </div>

                            <div className="flex-grow">
                                <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-1">{path.title}</h2>
                                <h3 className="text-2xl font-display font-bold text-white mb-4">{path.role}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6">{path.reason}</p>
                            </div>

                            <div className="space-y-4 pt-6 border-t border-white/5">
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-500">Difficulty</span>
                                    <span className="text-slate-300 font-semibold">{path.difficulty}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-500">Est. Transition</span>
                                    <span className="text-slate-300 font-semibold">{path.time}</span>
                                </div>
                                <button
                                    onClick={() => handleSelectPath(path)}
                                    disabled={selecting}
                                    className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-semibold transition-all flex items-center justify-center gap-2"
                                >
                                    {selecting === path.role ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Select This Path'}
                                </button>
                            </div>
                        </GlassCard>
                    );
                })}
            </div>
        </div>
    );
}
