'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface Post {
    content: string;
    date: string;
    username: string;
}

interface PostContextProps {
    posts: Post[];
    addPost: (post: Post) => void;
}

const PostContext = createContext<PostContextProps | undefined>(undefined);

export const PostProvider = ({ children }: { children: ReactNode }) => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const storedPosts = JSON.parse(localStorage.getItem('posts') || '[]') as Post[];
        setPosts(storedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    }, []);

    const addPost = (post: Post) => {
        const updatedPosts = [post, ...posts];
        setPosts(updatedPosts);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
    };

    return (
        <PostContext.Provider value={{ posts, addPost }}>
            {children}
        </PostContext.Provider>
    );
};

export const usePosts = () => {
    const context = useContext(PostContext);
    if (!context) {
        throw new Error('usePosts must be used within a PostProvider');
    }
    return context;
};
