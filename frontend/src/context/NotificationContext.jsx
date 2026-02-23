import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([]);

    const showNotification = useCallback((message, type = 'info') => {
        const id = Date.now();
        setNotifications(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== id));
        }, 5000);
    }, []);

    const removeNotification = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-3 pointer-events-none">
                <AnimatePresence>
                    {notifications.map((n) => (
                        <NotificationItem
                            key={n.id}
                            notification={n}
                            onClose={() => removeNotification(n.id)}
                        />
                    ))}
                </AnimatePresence>
            </div>
        </NotificationContext.Provider>
    );
}

function NotificationItem({ notification, onClose }) {
    // 1. Define theme colors based on type
    const themes = {
        success: {
            container: "bg-green-50 border-green-500 text-green-900",
            icon: <CheckCircle className="w-5 h-5 text-green-600" />,
            close: "text-green-500 hover:text-green-700"
        },
        error: {
            container: "bg-red-50 border-red-500 text-red-900",
            icon: <AlertCircle className="w-5 h-5 text-red-600" />,
            close: "text-red-500 hover:text-red-700"
        },
        info: {
            container: "bg-blue-50 border-primary text-blue-900",
            icon: <Info className="w-5 h-5 text-primary" />,
            close: "text-blue-500 hover:text-blue-700"
        }
    };

    const currentTheme = themes[notification.type] || themes.info;

    return (
        <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            // 2. Swapped glass-morphism for the theme container
            className={`pointer-events-auto w-80 p-4 rounded-xl border-l-4 shadow-lg flex gap-3 items-start ${currentTheme.container}`}
        >
            <div className="mt-0.5">{currentTheme.icon}</div>

            {/* 3. Text color is now dark and visible */}
            <p className="text-sm flex-grow font-semibold leading-relaxed">
                {notification.message}
            </p>

            <button
                onClick={onClose}
                className={`transition-colors ${currentTheme.close}`}
            >
                <X className="w-4 h-4" />
            </button>
        </motion.div>
    );
}

export const useNotifications = () => useContext(NotificationContext);
