import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Send } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { useNotifications } from '../context/NotificationContext';

const QUESTIONS = [
    {
        id: 1,
        text: "Which environment draws you in the most?",
        options: ["Building digital solutions", "Creative visual design", "Leading high-impact teams", "Analyzing complex data"]
    },
    {
        id: 2,
        text: "How do you prefer to solve a problem?",
        options: ["Step-by-step logic", "Intuitive brainstorming", "Collaborating with others", "Deep independent research"]
    }
];

export default function Quiz() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { showNotification } = useNotifications();
    const navigate = useNavigate();

    const handleSelect = (option) => {
        setAnswers({ ...answers, [step]: option });
    };

    const next = () => step < QUESTIONS.length - 1 && setStep(step + 1);
    const prev = () => step > 0 && setStep(step - 1);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        const token = localStorage.getItem('token'); // Retrieve the JWT stored during login

        try {
            // 1. Convert answers object to an array for the backend
            const selectedSkills = Object.values(answers);

            // 2. Get recommendations from Postgres via the Career Controller
            const recResponse = await fetch('http://localhost:8000/api/careers/recommend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ userSkills: selectedSkills })
            });

            if (!recResponse.ok) throw new Error("Failed to fetch matches");
            const recommendations = await recResponse.json();

            // 3. Save the results to the quiz_results table
            const saveResponse = await fetch('http://localhost:8000/api/quiz/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    score: recommendations[0]?.match_percentage || 0,
                    recommendations: recommendations // This saves the full objects to JSONB
                })
            });

            if (!saveResponse.ok) throw new Error("Failed to save result to database");

            showNotification("Assessment complete! Your career paths are ready.", "success");
            navigate('/career');
        } catch (error) {
            showNotification(error.message || "Could not connect to the server.", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="pt-24 pb-12 px-6 max-w-3xl mx-auto">
            <div className="mb-12">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">Aptitude Quiz</span>
                    <span className="text-xs text-slate-500">Step {step + 1} of {QUESTIONS.length}</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
                    />
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <GlassCard className="py-12 px-8">
                        <h2 className="text-2xl font-display font-bold text-white mb-8 text-center">{QUESTIONS[step].text}</h2>

                        <div className="grid grid-cols-1 gap-4">
                            {QUESTIONS[step].options.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => handleSelect(option)}
                                    className={`w-full p-6 rounded-2xl border-2 text-left transition-all ${answers[step] === option
                                        ? 'bg-primary/20 border-primary text-white shadow-[0_0_20px_rgba(99,102,241,0.2)]'
                                        : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/10 hover:text-slate-200'
                                        }`}
                                >
                                    <span className="font-semibold">{option}</span>
                                </button>
                            ))}
                        </div>

                        <div className="mt-12 flex justify-between gap-4">
                            <button
                                onClick={prev}
                                disabled={step === 0}
                                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 text-white font-bold disabled:opacity-30 transition-all hover:bg-white/10"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Previous
                            </button>

                            {step === QUESTIONS.length - 1 ? (
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting || !answers[step]}
                                    className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-accent-purple text-white font-bold hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Analyzing...' : 'Analyze Results'}
                                    {!isSubmitting && <Send className="w-4 h-4" />}
                                </button>
                            ) : (
                                <button
                                    onClick={next}
                                    disabled={!answers[step]}
                                    className="flex items-center gap-2 px-8 py-3 rounded-xl bg-white/5 text-white font-bold disabled:opacity-30 transition-all hover:bg-white/10"
                                >
                                    Next Question
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </GlassCard>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}