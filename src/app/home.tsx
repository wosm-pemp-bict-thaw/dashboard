'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Post {
    content: string;
    date: string;
    username: string;
}

const Home = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const storedPosts = JSON.parse(localStorage.getItem('posts') || '[]') as Post[];
        setPosts(storedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Home</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {posts.map((post, index) => (
                    <div key={index} className="p-4 bg-white rounded shadow-sm">
                        <Link href={`/${post.username}`}>
                            <span className="font-bold text-primary cursor-pointer">{post.username}</span>
                        </Link>
                        <p className="text-gray-700">{post.content}</p>
                        <p className="text-gray-500 text-sm">{new Date(post.date).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
