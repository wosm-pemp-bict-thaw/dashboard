'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
    username: yup.string()
        .matches(/^[a-zA-Z0-9_]+$/, 'Username must be alphanumeric with underscores only')
        .required('Username is required'),
    password: yup.string()
        .test('is-valid', 'Invalid password', value => {
            if (!value) return false;
            // Check if any character appears more than twice
            const charCount = {};
            for (let i = 0; i < value.length; i++) {
                const char = value[i];
                if (!charCount[char]) {
                    charCount[char] = 0;
                }
                charCount[char]++;
                if (charCount[char] > 2) {
                    return false;
                }
                // Check if character at index i is different from characters at indices i-1 and i-2
                if (i > 1 && (value[i] === value[i - 1] || value[i] === value[i - 2])) {
                    return false;
                }
            }
            return true;
        })
        .required('Password is required')
});

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const router = useRouter();

    const onSubmit = (data) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.find(user => user.username === data.username)) {
            toast.error('Username already exists');
            return;
        }
        users.push(data);
        localStorage.setItem('users', JSON.stringify(users));
        toast.success('Sign up successful');
        router.push('/signin');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Username</label>
                    <input {...register('username')} className="mt-1 block w-full p-2 border border-gray-300 rounded"/>
                    {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Password</label>
                    <input type="password" {...register('password')}
                           className="mt-1 block w-full p-2 border border-gray-300 rounded"/>
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>
                <button type="submit" className="mt-4 bg-primary text-white p-2 rounded hover:bg-pink-600">Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignUp;
