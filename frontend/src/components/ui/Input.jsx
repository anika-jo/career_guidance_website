import React from 'react';

export function Input({ label, ...props }) {
    return (
        <div className="space-y-1.5">
            {label && <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">{label}</label>}
            <input
                {...props}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
        </div>
    );
}
