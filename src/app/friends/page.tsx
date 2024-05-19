'use client';

import { useEffect, useState } from 'react';

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
    };

    return (
        <div>
            <h1>My Friends</h1>
            <ul>
                {friends.map((friend, index) => (
                    <li key={index}>
                        {friend} <button onClick={() => handleUnfriend(friend)}>Unfriend</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Friends;
