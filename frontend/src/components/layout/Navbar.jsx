import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Bell, Search, Compass, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function Navbar() {
    const location = useLocation();
    const { user, logout } = useAuth();
    const isActive = (path) => location.pathname === path;

    return (
        // Changed to white background, slate border, and dark text
        <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-slate-100 bg-white/80 backdrop-blur-md px-6 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
                {/* Updated gradient to use your new accent-violet */}
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent-violet flex items-center justify-center shadow-md shadow-primary/20">
                    <Compass className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-display font-bold tracking-tight text-slate-900">North Star</span>
            </Link>

            {user && (
                <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-500">
                    <Link to="/" className={isActive('/') ? 'text-primary' : 'hover:text-primary transition-colors'}>Dashboard</Link>
                    <Link to="/career" className={isActive('/career') ? 'text-primary' : 'hover:text-primary transition-colors'}>Career Pathways</Link>
                    <Link to="/roadmap" className={isActive('/roadmap') ? 'text-primary' : 'hover:text-primary transition-colors'}>Skill Roadmap</Link>
                    <Link to="/quiz" className={isActive('/quiz') ? 'text-primary' : 'hover:text-primary transition-colors'}>Take Quiz</Link>
                </div>
            )}

            <div className="flex items-center gap-4">
                {user ? (
                    <>
                        <button className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                            <Search className="w-5 h-5" />
                        </button>
                        <button className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>

                        <div className="flex items-center gap-3 pl-2 border-l border-slate-100">
                            <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
                                <User className="w-5 h-5 text-primary" />
                            </div>
                            <div className="hidden lg:block text-left">
                                {/* FIX: Added user?.name to prevent crashing during refresh */}
                                <p className="text-xs font-bold text-slate-900 leading-none">
                                    {user?.name || "User"}
                                </p>
                                <p className="text-[10px] text-accent-violet font-bold mt-1 uppercase tracking-tighter">Pro Member</p>
                            </div>
                            <button
                                onClick={logout}
                                className="p-2 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-500 transition-all ml-2"
                                title="Logout"
                            >
                                <LogOut className="w-4 h-4" />
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center gap-4">
                        <Link to="/login" className="text-sm font-bold text-slate-500 hover:text-primary transition-colors">Sign In</Link>
                        <Link to="/signup" className="px-5 py-2 rounded-full bg-gradient-to-r from-primary to-accent-violet text-white text-sm font-bold transition-all shadow-lg shadow-primary/25 hover:opacity-90">
                            Get Started
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}