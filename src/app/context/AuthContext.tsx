'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextProps {
    isAuthenticated: boolean;
    currentUser: { username: string } | null;
    signIn: (user: { username: string }) => void;
    signOut: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState<{ username: string } | null>(null);

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('currentUser') || 'null');
        if (user) {
            setIsAuthenticated(true);
            setCurrentUser(user);
        }
    }, []);

    const signIn = (user: { username: string }) => {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        setIsAuthenticated(true);
        setCurrentUser(user);
    };

    const signOut = () => {
        sessionStorage.removeItem('currentUser');
        setIsAuthenticated(false);
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, currentUser, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
