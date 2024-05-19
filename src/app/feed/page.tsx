'use client';

import { useEffect, useState } from 'react';

interface Post {
    content: string;
    date: string;
    username: string;
}

const Feed = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [friends, setFriends] = useState<string[]>([]);

    useEffect(() => {
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
        const storedPosts = JSON.parse(localStorage.getItem('posts') || '[]') as Post[];
        const storedFriends = JSON.parse(localStorage.getItem('friends') || '{}')[currentUser.username] || [];
        setFriends(storedFriends);
        const friendPosts = storedPosts.filter(post => storedFriends.includes(post.username));
        setPosts(friendPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    }, []);

    const seedPosts = () => {
        const samplePosts = [
            { content: "Sample Post 1", date: new Date().toISOString(), username: "user1" },
            { content: "Sample Post 2", date: new Date().toISOString(), username: "user2" },
            { content: "Sample Post 3", date: new Date().toISOString(), username: "user3" },
            { content: "Sample Post 4", date: new Date().toISOString(), username: "user4" },
            { content: "Sample Post 5", date: new Date().toISOString(), username: "user5" }
        ];

        localStorage.setItem('posts', JSON.stringify(samplePosts));
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
        const storedFriends = JSON.parse(localStorage.getItem('friends') || '{}')[currentUser.username] || [];
        const friendPosts = samplePosts.filter(post => storedFriends.includes(post.username));
        setPosts(friendPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    };

    return (
        <div>
            <h1>Feed</h1>
            <button onClick={seedPosts}>Seed Posts</button>
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

export default Feed;
