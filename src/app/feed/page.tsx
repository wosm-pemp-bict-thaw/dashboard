'use client';

import { useEffect, useState } from 'react';
import { usePosts } from '../context/PostContext';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

const Feed = () => {
    const [friendPosts, setFriendPosts] = useState<Post[]>([]);
    const [friends, setFriends] = useState<string[]>([]);
    const { posts } = usePosts();
    const { currentUser } = useAuth();

    useEffect(() => {
        const currentUserData = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
        const storedFriends = JSON.parse(localStorage.getItem('friends') || '{}')[currentUserData.username] || [];
        setFriends(storedFriends);
        const filteredPosts = posts.filter(post => storedFriends.includes(post.username));
        setFriendPosts(filteredPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    }, [posts, currentUser]);

    const seedPosts = () => {
        const samplePosts = [
            { content: "Sample Post 1", date: new Date().toISOString(), username: "user1" },
            { content: "Sample Post 2", date: new Date().toISOString(), username: "user2" },
            { content: "Sample Post 3", date: new Date().toISOString(), username: "user3" },
            { content: "Sample Post 4", date: new Date().toISOString(), username: "user4" },
            { content: "Sample Post 5", date: new Date().toISOString(), username: "user5" }
        ];

        localStorage.setItem('posts', JSON.stringify(samplePosts));
        const currentUserData = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
        const storedFriends = JSON.parse(localStorage.getItem('friends') || '{}')[currentUserData.username] || [];
        const filteredPosts = samplePosts.filter(post => storedFriends.includes(post.username));
        setFriendPosts(filteredPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Feed</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {friendPosts.map((post, index) => (
                    <div key={index} className="p-4 bg-white rounded shadow-sm">
                        <Link href={`/${post.username}`}>
                            <span className="font-bold text-primary cursor-pointer">{post.username}</span>
                        </Link>
                        <p className="text-gray-700">{post.content}</p>
                        <p className="text-gray-500 text-sm">{new Date(post.date).toLocaleString()}</p>
                    </div>
                ))}
            </div>
            <button onClick={seedPosts} className="mt-4 bg-primary text-white p-2 rounded hover:bg-pink-600">
                Seed Posts
            </button>
        </div>
    );
};

export default Feed;
