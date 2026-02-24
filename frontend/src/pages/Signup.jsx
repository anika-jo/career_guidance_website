import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { GlassCard } from '../components/ui/GlassCard';
import { Input } from '../components/ui/Input';
import { Compass, User, Mail, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { signup } = useAuth();
    const { showNotification } = useNotifications();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);i
        try {
            await signup(name, email, password);
            showNotification("Account created successfully! Welcome to North Star.", "success");
            navigate('/');
        } catch (error) {
            showNotification(error.message, "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md p-10 bg-slate-50 border border-slate-100 rounded-[2rem] shadow-soft"
            >
                <div className="flex flex-col items-center mb-10">
                    {/* Icon with Blue-to-Violet Gradient */}
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent-violet flex items-center justify-center mb-4 shadow-xl shadow-primary/20">
                        <User className="w-7 h-7 text-white" />
                    </div>

                    {/* Visible Dark Text */}
                    <h1 className="text-3xl font-display font-bold text-slate-900">Get Started</h1>
                    <p className="text-slate-500 text-sm mt-2">Begin your personalized career journey</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <Input
                        label="Full Name"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <Input
                        label="Email Address"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-accent-violet hover:opacity-90 text-white font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/25 disabled:opacity-50"
                    >
                        {isSubmitting ? 'Creating Account...' : (
                            <>
                                Start My Journey
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </form>

                <p className="text-center text-slate-500 text-sm mt-8">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary font-bold hover:text-accent-violet transition-colors">
                        Sign In
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
