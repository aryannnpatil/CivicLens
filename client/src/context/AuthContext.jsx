import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import API from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check for existing token on mount
    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        if (!token) {
            setLoading(false);
            return;
        }
        API.get('/auth/verify', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => {
                setAdmin(res.data.admin);
            })
            .catch(() => {
                localStorage.removeItem('admin_token');
            })
            .finally(() => setLoading(false));
    }, []);

    const login = useCallback(async (username, password) => {
        const { data } = await API.post('/auth/login', { username, password });
        localStorage.setItem('admin_token', data.token);
        setAdmin(data.admin);
        return data;
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('admin_token');
        setAdmin(null);
    }, []);

    return (
        <AuthContext.Provider value={{ admin, loading, login, logout, isAuthenticated: !!admin }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
