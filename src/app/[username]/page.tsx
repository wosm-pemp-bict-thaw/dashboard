'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface Post {
    content: string;
    date: string;
    username: string;
}

const UserProfile = () => {
    const router = useRouter();
    const pathname = usePathname();
    const username = pathname.split('/')[1];
    const [posts, setPosts] = useState<Post[]>([]);
    const [isFriend, setIsFriend] = useState(false);
    const [isOwnProfile, setIsOwnProfile] = useState(false);

    useEffect(() => {
        if (!username) return;

        const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
        setIsOwnProfile(currentUser.username === username);

        const storedPosts = JSON.parse(localStorage.getItem('posts') || '[]') as Post[];
        const userPosts = storedPosts.filter(post => post.username === username);
        setPosts(userPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));

        const storedFriends = JSON.parse(localStorage.getItem('friends') || '{}')[currentUser.username] || [];
        setIsFriend(storedFriends.includes(username));
    }, [username]);

    const handleFriendToggle = () => {
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
        const storedFriends = JSON.parse(localStorage.getItem('friends') || '{}');
        const userFriends = storedFriends[currentUser.username] || [];

        if (isFriend) {
            storedFriends[currentUser.username] = userFriends.filter(friend => friend !== username);
        } else {
            storedFriends[currentUser.username] = [...userFriends, username];
        }

        localStorage.setItem('friends', JSON.stringify(storedFriends));
        setIsFriend(!isFriend);
    };

    return (
        <div>
            <h1>{username}'s Profile</h1>
            {!isOwnProfile && (
                <button onClick={handleFriendToggle}>
                    {isFriend ? 'Unfriend' : 'Befriend'}
                </button>
            )}
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

export default UserProfile;
