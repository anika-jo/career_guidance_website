import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import Dashboard from './pages/Dashboard';
import Quiz from './pages/Quiz';
import CareerPaths from './pages/CareerPaths';
import Roadmap from './pages/Roadmap';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return null;
    if (!user) return <Navigate to="/login" />;
    return children;
};

// Public Route (redirects to dashboard if logged in)
const PublicRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return null;
    if (user) return <Navigate to="/" />;
    return children;
};

import Loader from './components/ui/Loader';

function AppContent() {
    const { user } = useAuth();
    const [appLoading, setAppLoading] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setAppLoading(false);
        }, 6000); // 6 seconds to ensure the calligraphy finishes writing
        return () => clearTimeout(timer);
    }, []);

    if (appLoading) return <Loader />;

    return (
        <div className="min-h-screen bg-background relative selection:bg-primary/30">
            <Navbar />

            <main className="relative z-10 w-full min-h-screen">
                <Routes>
                    <Route path="/welcome" element={<Landing />} />
                    <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                    <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />

                    <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
                    <Route path="/career" element={<ProtectedRoute><CareerPaths /></ProtectedRoute>} />
                    <Route path="/roadmap" element={<ProtectedRoute><Roadmap /></ProtectedRoute>} />

                    <Route path="*" element={<Navigate to={user ? "/" : "/welcome"} />} />
                </Routes>
            </main>

            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-accent-purple/10 rounded-full blur-[120px] animate-pulse" />
            </div>
        </div>
    );
}

function App() {
    return (
        <AuthProvider>
            <NotificationProvider>
                <Router>
                    <AppContent />
                </Router>
            </NotificationProvider>
        </AuthProvider>
    );
}

export default App;
