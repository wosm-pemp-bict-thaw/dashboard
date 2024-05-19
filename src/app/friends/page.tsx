'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface User {
    username: string;
}

const Friends = () => {
    const [friends, setFriends] = useState<string[]>([]);
    const [allUsers, setAllUsers] = useState<User[]>([]);

    useEffect(() => {
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
        const storedFriends = JSON.parse(localStorage.getItem('friends') || '{}')[currentUser.username] || [];
        setFriends(storedFriends);

        const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
        setAllUsers(users);
    }, []);

    const handleUnfriend = (friendUsername: string) => {
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
        const storedFriends = JSON.parse(localStorage.getItem('friends') || '{}');
        const updatedFriends = storedFriends[currentUser.username].filter((username: string) => username !== friendUsername);

        storedFriends[currentUser.username] = updatedFriends;
        localStorage.setItem('friends', JSON.stringify(storedFriends));
        setFriends(updatedFriends);
        toast.success(`${friendUsername} has been removed from your friends.`);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">My Friends</h1>
            <ul className="space-y-4">
                {friends.map((friend, index) => (
                    <li key={index} className="p-4 bg-white rounded shadow-sm">
                        {friend}
                        <button onClick={() => handleUnfriend(friend)}
                                className="ml-4 bg-red-500 text-white p-2 rounded">Unfriend
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Friends;
