import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Bell, Search, Compass, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function Navbar() {
    const location = useLocation();
    const { user, logout } = useAuth();
    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/5 bg-background/50 backdrop-blur-md px-6 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent-purple flex items-center justify-center">
                    <Compass className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-display font-bold tracking-tight text-white">North Star</span>
            </Link>

            {user && (
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
                    <Link to="/" className={isActive('/') ? 'text-white' : 'hover:text-white transition-colors'}>Dashboard</Link>
                    <Link to="/career" className={isActive('/career') ? 'text-white' : 'hover:text-white transition-colors'}>Career Pathways</Link>
                    <Link to="/roadmap" className={isActive('/roadmap') ? 'text-white' : 'hover:text-white transition-colors'}>Skill Roadmap</Link>
                    <Link to="/quiz" className={isActive('/quiz') ? 'text-white' : 'hover:text-white transition-colors'}>Take Quiz</Link>
                </div>
            )}

            <div className="flex items-center gap-4">
                {user ? (
                    <>
                        <button className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400">
                            <Search className="w-5 h-5" />
                        </button>
                        <button className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400 relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-accent-pink rounded-full border border-background"></span>
                        </button>
                        <div className="flex items-center gap-3 pl-2 border-l border-white/10">
                            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/20 flex items-center justify-center">
                                <User className="w-5 h-5 text-primary" />
                            </div>
                            <div className="hidden lg:block">
                                <p className="text-xs font-bold text-white leading-none">{user.name}</p>
                                <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-tighter">Gold Tier</p>
                            </div>
                            <button
                                onClick={logout}
                                className="p-2 hover:bg-white/5 rounded-lg text-slate-500 hover:text-white transition-all ml-2"
                                title="Logout"
                            >
                                <LogOut className="w-4 h-4" />
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center gap-4">
                        <Link to="/login" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Sign In</Link>
                        <Link to="/signup" className="px-5 py-2 rounded-full bg-primary hover:bg-primary-hover text-white text-sm font-bold transition-all shadow-lg shadow-primary/20">Get Started</Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
