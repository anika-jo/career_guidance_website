import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { GlassCard } from '../components/ui/GlassCard';
import { Input } from '../components/ui/Input';
import { Compass, Mail, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useAuth();
    const { showNotification } = useNotifications();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const user = await login(email, password);
            showNotification(`Welcome back, ${user.name}!`, "success");
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
                    {/* Updated Icon Gradient */}
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent-violet flex items-center justify-center mb-4 shadow-xl shadow-primary/20">
                        <Compass className="w-7 h-7 text-white" />
                    </div>
                    {/* Updated Text Colors for Visibility */}
                    <h1 className="text-3xl font-display font-bold text-slate-900">Welcome Back</h1>
                    <p className="text-slate-500 text-sm mt-2">Sign in to your career journey</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <Input
                        label="Email Address"
                        // These labels in your Input component should now be text-slate-700
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-accent-violet hover:opacity-90 text-white font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/25"
                    >
                        {isSubmitting ? 'Signing In...' : 'Sign In'}
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </form>

                <p className="text-center text-slate-500 text-sm mt-8">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-primary font-bold hover:text-accent-violet transition-colors">Create one</Link>
                </p>
            </motion.div>
        </div>
    );
}
