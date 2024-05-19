'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { usePosts } from '../context/PostContext';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

const UserProfile = () => {
    const router = useRouter();
    const pathname = usePathname();
    const username = pathname.split('/')[1];
    const { posts } = usePosts();
    const { currentUser } = useAuth();
    const [userPosts, setUserPosts] = useState<Post[]>([]);
    const [isFriend, setIsFriend] = useState(false);
    const [isOwnProfile, setIsOwnProfile] = useState(false);

    useEffect(() => {
        if (!username) return;

        setIsOwnProfile(currentUser?.username === username);

        const filteredPosts = posts.filter(post => post.username === username);
        setUserPosts(filteredPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));

        const storedFriends = JSON.parse(localStorage.getItem('friends') || '{}')[currentUser?.username] || [];
        setIsFriend(storedFriends.includes(username));
    }, [username, posts, currentUser]);

    const handleFriendToggle = () => {
        const storedFriends = JSON.parse(localStorage.getItem('friends') || '{}');
        const userFriends = storedFriends[currentUser?.username] || [];

        if (isFriend) {
            storedFriends[currentUser?.username] = userFriends.filter(friend => friend !== username);
        } else {
            storedFriends[currentUser?.username] = [...userFriends, username];
        }

        localStorage.setItem('friends', JSON.stringify(storedFriends));
        setIsFriend(!isFriend);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">{username}&#39;s Profile</h1>
            {!isOwnProfile && (
                <button onClick={handleFriendToggle} className="bg-primary text-white p-2 rounded hover:bg-pink-600">
                    {isFriend ? 'Unfriend' : 'Befriend'}
                </button>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {userPosts.map((post, index) => (
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

export default UserProfile;
