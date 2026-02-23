import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load user from backend on init if token exists
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const profileData = await api.get('/profile');
                    setUser(profileData);
                } catch (error) {
                    console.error("Auth check failed:", error);
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };
        checkAuth();
    }, []);

    const login = async (email, password) => {
        const { token, user: userData } = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', token);
        setUser(userData);
        return userData;
    };

    const signup = async (name, email, password) => {
        const { token, user: userData } = await api.post('/auth/register', { name, email, password });
        localStorage.setItem('token', token);
        setUser(userData);
        return userData;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    const updateProfile = async (updates) => {
        const updatedUser = await api.post('/profile', updates);
        setUser(updatedUser);
        return updatedUser;
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, updateProfile, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
