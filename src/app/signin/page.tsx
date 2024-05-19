'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const SignIn = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();

    const onSubmit = (data: { username: string, password: string }) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find((user: { username: string, password: string }) => user.username === data.username && user.password === data.password);
        if (user) {
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            toast.success('Sign in successful');
            router.push('/');
        } else {
            toast.error('Invalid credentials');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Sign In</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Username</label>
                    <input {...register('username', {required: true})}
                           className="mt-1 block w-full p-2 border border-gray-300 rounded"/>
                    {errors.username && <p className="text-red-500 text-sm">Username is required</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Password</label>
                    <input type="password" {...register('password', {required: true})}
                           className="mt-1 block w-full p-2 border border-gray-300 rounded"/>
                    {errors.password && <p className="text-red-500 text-sm">Password is required</p>}
                </div>
                <button type="submit" className="mt-4 bg-primary text-white p-2 rounded hover:bg-pink-600">Sign In
                </button>
            </form>
        </div>
    );
};

export default SignIn;
