'use client';

import { useEffect } from 'react';

const SignOut = () => {
    useEffect(() => {
        sessionStorage.removeItem('currentUser');
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Signed Out</h1>
            <p>You have been signed out successfully.</p>
        </div>
    );
};

export default SignOut;
