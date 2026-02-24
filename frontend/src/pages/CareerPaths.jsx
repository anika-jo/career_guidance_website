import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../components/ui/GlassCard';
import { Rocket, Shield, Zap, Map, Loader2, BookOpen } from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';

const ICON_MAP = { Rocket, Shield, Zap, Map };

export default function CareerPaths() {
    const [paths, setPaths] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedId, setSelectedId] = useState(null);
    const { user, viewMode } = useAuth(); // Get viewMode from Context
    const [roadmap, setRoadmap] = useState([]);
    const { showNotification } = useNotifications();

    useEffect(() => {
        const fetchPaths = async () => {
            setLoading(true);
            try {
                const mockSkills = ['React', 'JavaScript', 'HTML', 'SQL', 'CSS'];
                // Uses the global viewMode that Navbar just updated
                const data = await api.post(`/careers/recommend?type=${viewMode}`, {
                    userSkills: mockSkills
                });
                setPaths(data);
            } catch (error) {
                console.error("Fetch error", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPaths();
    }, [viewMode]);// Re-fetch immediately when the toggle changes


    const handleViewRoadmap = async (path) => {
        try {
            const data = await api.get(`/careers/${path.id}/roadmap`);
            setRoadmap(data);
            setSelectedId(path.id);
        } catch (error) {
            showNotification("Error loading roadmap.", "error");
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>;

    return (
        <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto space-y-8">
            <header>
                <h1 className="text-4xl font-display font-bold text-white">Top Career Matches</h1>
                <p className="text-slate-400 mt-2 text-lg italic">Personalized rankings for your {viewMode} profile.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {paths.map((path) => {
                    const Icon = ICON_MAP[path.icon] || Rocket;
                    return (
                        <GlassCard key={path.id} className="flex flex-col h-full cursor-pointer" onClick={() => handleViewRoadmap(path)}>
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 rounded-xl bg-white/5 text-primary"><Icon className="w-8 h-8" /></div>
                                <div className="text-right">
                                    <span className="text-2xl font-bold text-slate-900">{Math.round(path.match_percentage || 0)}%</span>
                                    <p className="text-[10px] uppercase text-slate-500 font-bold">Match</p>
                                </div>
                            </div>
                            <div className="flex-grow">
                                <h2 className="text-xs font-bold uppercase text-primary mb-1">{path.category}</h2>
                                <h3 className="text-2xl font-display font-bold text-white mb-4">{path.title}</h3>
                                <p className="text-slate-400 text-sm line-clamp-3">{path.description}</p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-white/5 text-primary text-sm font-bold">View Roadmap →</div>
                        </GlassCard>
                    );
                })}
            </div>

            <AnimatePresence>
                {selectedId && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md">
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#0f172a] border border-white/10 rounded-[2rem] p-10 max-w-2xl w-full max-h-[85vh] overflow-y-auto relative">
                            <button onClick={() => setSelectedId(null)} className="absolute top-8 right-8 text-slate-400 hover:text-white font-bold">Close</button>
                            <h2 className="text-3xl font-display font-bold text-white mb-8">Career Roadmap</h2>
                            <div className="space-y-8 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/5">
                                {roadmap.map((step) => (
                                    <div key={step.id} className="pl-12 relative mb-6">
                                        <div className="absolute left-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
                                            {step.step_number}
                                        </div>
                                        <h4 className="font-bold text-white text-lg">{step.instruction}</h4>

                                        {/* Only show the link button if resource_link exists */}
                                        {step.resource_link && (
                                            <a
                                                href={step.resource_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-primary text-xs font-bold hover:bg-white/10 transition-all"
                                            >
                                                <BookOpen className="w-3 h-3" />
                                                Start Learning
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}