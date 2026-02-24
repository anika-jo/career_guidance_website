import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('student');


    // Load user from backend on init if token exists
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    // 1. Hit the specific /me endpoint
                    const response = await api.get('/profile/me');

                    // 2. Since you use fetch in api.js, the response IS the user object.
                    // Remove '.data' here.
                    setUser(response);
                } catch (error) {
                    console.error("Auth check failed:", error);
                    localStorage.removeItem('token');
                    setUser(null);
                }
            }
            setLoading(false);
        };
        checkAuth();
    }, []);

    const login = async (email, password) => {
        // api.post returns the JSON directly
        const response = await api.post('/auth/login', { email, password });

        // Destructure directly from the response object
        const { token, user: userData } = response;

        if (token) {
            localStorage.setItem('token', token);
            setUser(userData);
            return userData;
        }
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
        try {
            const response = await api.post('/profile/update', updates);
            // Your custom API wrapper should return the unwrapped JSON
            setUser(response);
            return response;
        } catch (error) {
            console.error("Profile update failed:", error);
            throw error;
        }
    };

    // This prevents children (Navbar, Dashboard) from loading until we know who the user is
    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, updateProfile, viewMode, setViewMode, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
