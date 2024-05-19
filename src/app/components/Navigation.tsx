'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const Navigation = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState<{ username: string } | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('currentUser') || 'null');
        setIsAuthenticated(!!user);
        setCurrentUser(user);
    }, [pathname]);

    return (
        <nav>
            <div className="logo">
                <strong>ƒ</strong>
            </div>
            <ul>
                <li><Link href="/">Home</Link></li>
                {isAuthenticated ? (
                    <>
                        <li><Link href="/feed">My Feed</Link></li>
                        <li><Link href="/friends">My Friends</Link></li>
                        <li><Link href={`/${currentUser?.username}`}>My Profile</Link></li>
                        <li><Link href="/signout">Sign Out</Link></li>
                    </>
                ) : (
                    <>
                        <li><Link href="/signin">Sign In</Link></li>
                        <li><Link href="/signup">Sign Up</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navigation;
