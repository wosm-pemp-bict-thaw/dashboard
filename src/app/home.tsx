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
        <div>
            <h1>Home</h1>
            <ul>
                {posts.map((post, index) => (
                    <li key={index}>
                        {post.content} - {new Date(post.date).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
