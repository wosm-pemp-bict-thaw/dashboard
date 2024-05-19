'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const Navigation = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const currentUser = sessionStorage.getItem('currentUser');
        setIsAuthenticated(!!currentUser);
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
                        <li><Link href={`/profile`}>My Profile</Link></li>
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
