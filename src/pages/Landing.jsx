import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, Target, Map, Brain, Star } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { useAuth } from '../context/AuthContext';

export default function Landing() {
    const { user } = useAuth();
    const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const { clientX, clientY, currentTarget } = e;
        const { left, top } = currentTarget.getBoundingClientRect();
        setMousePos({ x: clientX - left, y: clientY - top });
    };

    const titleWords = "Navigate Your Career Future with Precision.".split(" ");

    return (
        <div
            className="relative min-h-screen pt-20 overflow-hidden bg-[#020617]"
            onMouseMove={handleMouseMove}
        >
            {/* Interactive Spotlight */}
            <div
                className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, rgba(56, 189, 248, 0.07), transparent 80%)`
                }}
            />

            {/* Hero Section */}
            <section className="relative px-6 py-20 md:py-32 flex flex-col items-center text-center max-w-5xl mx-auto z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-md">
                        <Star className="w-3 h-3 fill-primary" />
                        {user ? `Welcome Back, ${user.name}` : 'Powered by Advanced Career AI'}
                    </div>
                    <h1 className="text-5xl md:text-8xl font-display font-bold text-white leading-[1.1] tracking-tight">
                        {titleWords.map((word, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="inline-block mr-[0.2em]"
                            >
                                {word === "Career" || word === "Future" ? (
                                    <span className="text-gradient drop-shadow-sm">{word}</span>
                                ) : word}
                            </motion.span>
                        ))}
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl mt-8 max-w-2xl mx-auto leading-relaxed">
                        A structured, account-based platform designed to map your skills, close your gaps, and build your roadmap to the top.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center mt-12"
                >
                    {user ? (
                        <Link to="/" className="px-10 py-5 rounded-2xl bg-primary hover:bg-primary-hover text-white font-bold flex items-center justify-center gap-3 transition-all text-lg shadow-2xl shadow-primary/30 active:scale-95">
                            Go to Dashboard
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    ) : (
                        <>
                            <Link to="/signup" className="px-10 py-5 rounded-2xl bg-primary hover:bg-primary-hover text-white font-bold flex items-center justify-center gap-3 transition-all text-lg shadow-2xl shadow-primary/30 active:scale-95">
                                Start Your Journey
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link to="/login" className="px-10 py-5 rounded-2xl bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold flex items-center justify-center transition-all text-lg active:scale-95">
                                Sign In
                            </Link>
                        </>
                    )}
                </motion.div>
            </section>

            {/* Features Preview */}
            <section className="px-6 py-20 max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={Brain}
                        title="Aptitude Quiz"
                        description="Deep analysis of your skills, values, and work style using structured logic."
                    />
                    <FeatureCard
                        icon={Target}
                        title="Skill Gap Analysis"
                        description="Visual indicators showing exactly which skills you need to reach your target role."
                    />
                    <FeatureCard
                        icon={Map}
                        title="Dynamic Roadmap"
                        description="Adaptive steps that update in real-time as your availability or profile changes."
                    />
                </div>
            </section>

            {/* Background Blooms */}
            <div className="absolute top-[10%] left-[50%] -translate-x-1/2 w-[100vw] h-[100vw] bg-primary/5 rounded-full blur-[160px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-accent-purple/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
        </div>
    );
}

function FeatureCard({ icon: Icon, title, description }) {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="h-full"
        >
            <GlassCard className="p-8 h-full flex flex-col items-center text-center border-white/5 hover:border-white/20 transition-all">
                <div className="p-4 rounded-2xl bg-white/5 text-primary mb-6">
                    <Icon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-4">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
            </GlassCard>
        </motion.div>
    );
}
