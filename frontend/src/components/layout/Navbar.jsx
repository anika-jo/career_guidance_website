import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Compass, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function Navbar() {
    const location = useLocation();
    // Destructure viewMode and setViewMode from your context
    const { user, logout, updateProfile, viewMode, setViewMode } = useAuth();
    const isActive = (path) => location.pathname === path;

    const handleToggleType = async (newType) => {
        setViewMode(newType); // Updates the UI instantly everywhere
        try {
            // Still update the DB so it remembers next time they log in
            await updateProfile({ user_type: newType });
        } catch (error) {
            console.error("Sync failed, but local UI is updated.");
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-slate-100 bg-white/80 backdrop-blur-md px-6 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent-violet flex items-center justify-center shadow-md">
                    <Compass className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-display font-bold text-slate-900">North Star</span>
            </Link>

            {user && (
                <div className="flex items-center gap-8">
                    <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-500">
                        <Link to="/" className={isActive('/') ? 'text-primary' : 'hover:text-primary'}>Dashboard</Link>
                        <Link to="/career" className={isActive('/career') ? 'text-primary' : 'hover:text-primary'}>Pathways</Link>
                    </div>

                    <div className="bg-slate-100 p-1 rounded-full border border-slate-200 flex items-center">
                        <button
                            onClick={() => handleToggleType('student')}
                            className={`px-4 py-1.5 rounded-full text-[10px] uppercase font-bold transition-all ${viewMode === 'student' ? 'bg-white shadow-sm text-primary' : 'text-slate-400'
                                }`}
                        >
                            Student
                        </button>

                        <button
                            onClick={() => handleToggleType('pro')}
                            className={`px-4 py-1.5 rounded-full text-[10px] uppercase font-bold transition-all ${viewMode === 'pro' ? 'bg-white shadow-sm text-accent-violet' : 'text-slate-400'
                                }`}
                        >
                            Professional
                        </button>
                    </div>
                </div>
            )}

            <div className="flex items-center gap-4">
                {user && (
                    <div className="flex items-center gap-3 pl-2 border-l border-slate-100">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-primary"><User className="w-5 h-5" /></div>
                        <div className="hidden lg:block text-left">
                            <p className="text-xs font-bold text-slate-900 leading-none">{user.name}</p>
                            <p className="text-[10px] text-accent-violet font-bold uppercase mt-1">
                                {viewMode === 'pro' ? 'Industry Pro' : 'Learning Mode'}
                            </p>
                        </div>
                        <button onClick={logout} className="p-2 text-slate-400 hover:text-red-500"><LogOut className="w-4 h-4" /></button>
                    </div>
                )}
            </div>
        </nav>
    );
}