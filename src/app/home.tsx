'use client';

import { useEffect, useState } from 'react';

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
            <ul className="space-y-4">
                {posts.map((post, index) => (
                    <li key={index} className="p-4 bg-white rounded shadow-sm">
                        {post.content} - {new Date(post.date).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
