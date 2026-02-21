import React from 'react';
import { motion } from 'framer-motion';

export function MatchScore({ score }) {
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center">
            <svg className="w-48 h-48 transform -rotate-90">
                {/* Background circle */}
                <circle
                    cx="96"
                    cy="96"
                    r={radius}
                    fill="transparent"
                    stroke="rgba(255, 255, 255, 0.05)"
                    strokeWidth="12"
                />
                {/* Foreground progress circle */}
                <motion.circle
                    cx="96"
                    cy="96"
                    r={radius}
                    fill="transparent"
                    stroke="url(#matchGradient)"
                    strokeWidth="12"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    strokeLinecap="round"
                />
                <defs>
                    <linearGradient id="matchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                </defs>
            </svg>
            <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-display font-bold text-white">{score}%</span>
                <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Alignment</span>
            </div>
        </div>
    );
}
