import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass } from 'lucide-react';

const QUOTES = [
    "Choose a job you love, and you will never have to work a day in your life.",
    "The only way to do great work is to love what you do.",
    "Opportunities don't happen, you create them.",
    "Success is not final; failure is not fatal: it is the courage to continue that counts.",
    "The future depends on what you do today.",
    "Believe you can and you're halfway there.",
    "Your career is your storyboard; write a masterpiece."
];

const containerVariants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.04, // Slightly faster for smoother flow
        }
    }
};

const letterVariants = {
    initial: {
        opacity: 0,
        y: 2,
        filter: "blur(4px)",
    },
    animate: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.3,
            ease: "easeOut"
        }
    }
};

export default function Loader() {
    const [quote, setQuote] = useState("");

    useEffect(() => {
        setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
    }, []);

    // Split quote into words to prevent mid-word wrapping
    const words = quote.split(" ");

    return (
        <div className="fixed inset-0 z-[100] bg-[#020617] flex flex-col items-center justify-center overflow-hidden px-8 text-center select-none">
            {/* Ambient Background Blooms */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] bg-primary/10 rounded-full blur-[160px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="mb-16"
            >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent-purple flex items-center justify-center shadow-2xl shadow-primary/40 relative">
                    <Compass className="w-7 h-7 text-white" />
                    <div className="absolute inset-[-4px] border border-primary/20 rounded-2xl animate-pulse" />
                </div>
            </motion.div>

            <div className="max-w-4xl relative min-h-[140px] flex flex-wrap justify-center gap-y-2">
                <AnimatePresence>
                    {quote && (
                        <motion.div
                            variants={containerVariants}
                            initial="initial"
                            animate="animate"
                            className="text-4xl md:text-6xl text-primary/95 leading-snug flex flex-wrap justify-center"
                            style={{ fontFamily: "'Caveat', cursive" }}
                        >
                            {words.map((word, wordIdx) => (
                                <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
                                    {word.split("").map((char, charIdx) => (
                                        <motion.span
                                            key={`${char}-${charIdx}`}
                                            variants={letterVariants}
                                            className="inline-block"
                                        >
                                            {char}
                                        </motion.span>
                                    ))}
                                </span>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4.5, duration: 0.6 }}
                className="absolute bottom-16 flex flex-col items-center gap-3"
            >
                <div className="flex gap-2">
                    {[0, 1, 2].map(i => (
                        <motion.div
                            key={i}
                            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 1, 0.3] }}
                            transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
                            className="w-1 h-1 rounded-full bg-primary"
                        />
                    ))}
                </div>
                <span className="text-[10px] uppercase tracking-[0.6em] text-slate-500 font-bold">Aligning Future Stars</span>
            </motion.div>

            <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
    );
}
