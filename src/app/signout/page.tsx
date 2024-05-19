'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const SignOut = () => {
    const router = useRouter();

    useEffect(() => {
        sessionStorage.removeItem('currentUser');
        router.push('/');
    }, [router]);

    return (
        <div>
            <h1>Signed Out</h1>
            <p>You have been signed out successfully.</p>
        </div>
    );
};

export default SignOut;
