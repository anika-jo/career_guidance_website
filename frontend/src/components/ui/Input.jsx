import React from 'react';

export function Input({ label, ...props }) {
    return (
        <div className="space-y-1.5">
            {label && <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">{label}</label>}
            <input
                {...props}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 transition-all"
            />
        </div>
    );
}
