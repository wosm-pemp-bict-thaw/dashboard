'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';
import PostModal from './PostModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navigation = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState<{ username: string } | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('currentUser') || 'null');
        setIsAuthenticated(!!user);
        setCurrentUser(user);
    }, [pathname]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handlePostSubmit = (message: string) => {
        const posts = JSON.parse(localStorage.getItem('posts') || '[]');
        const newPost = {
            content: message,
            date: new Date().toISOString(),
            username: currentUser?.username,
        };
        posts.push(newPost);
        localStorage.setItem('posts', JSON.stringify(posts));
        toast.success('Post added successfully!');
    };

    return (
        <>
            <nav className="bg-gray-100 border-b border-gray-200 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold text-primary">ƒ</Link>
                    <div className="flex">
                        <div className="flex items-center space-x-2 lg:space-x-4">
                            {isAuthenticated && (
                                <button
                                    onClick={openModal}
                                    className="text-black bg-primary hover:bg-pink-600 p-2 mx-2 rounded"
                                >
                                    <PlusIcon className="h-6 w-6 text-white" />
                                </button>
                            )}
                            <div className="lg:hidden">
                                <Menu>
                                    {({ open }) => (
                                        <>
                                            <Menu.Button className="text-gray-800 focus:outline-none">
                                                {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                                            </Menu.Button>
                                            <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <div className="py-1">
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <Link href="/" className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}>
                                                                Home
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                                    {isAuthenticated ? (
                                                        <>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <Link href="/feed" className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}>
                                                                        My Feed
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <Link href="/friends" className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}>
                                                                        My Friends
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <Link href={`/${currentUser?.username}`} className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}>
                                                                        My Profile
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <Link href="/signout" className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}>
                                                                        Sign Out
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <Link href="/signin" className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}>
                                                                        Sign In
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <Link href="/signup" className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}>
                                                                        Sign Up
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>
                                                        </>
                                                    )}
                                                </div>
                                            </Menu.Items>
                                        </>
                                    )}
                                </Menu>
                            </div>
                        </div>
                        <div className="hidden lg:flex items-center space-x-4">
                            <Link href="/" className="text-primary hover:underline">Home</Link>
                            {isAuthenticated ? (
                                <>
                                    <Link href="/feed" className="text-primary hover:underline">My Feed</Link>
                                    <Link href="/friends" className="text-primary hover:underline">My Friends</Link>
                                    <Link href={`/${currentUser?.username}`} className="text-primary hover:underline">My Profile</Link>
                                    <Link href="/signout" className="text-primary hover:underline">Sign Out</Link>
                                </>
                            ) : (
                                <>
                                    <Link href="/signin" className="text-primary hover:underline">Sign In</Link>
                                    <Link href="/signup" className="text-primary hover:underline">Sign Up</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            {isAuthenticated && (
                <>
                    <PostModal isOpen={isModalOpen} closeModal={closeModal} onSubmit={handlePostSubmit} />
                </>
            )}
            <ToastContainer />
        </>
    );
};

export default Navigation;
