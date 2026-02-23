import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function GlassCard({ children, className, ...props }) {
    return (
        <div
            className={twMerge(
                "glass-morphism p-6 rounded-2xl",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
