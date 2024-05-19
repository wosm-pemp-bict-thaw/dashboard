'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';

const schema = yup.object().shape({
    username: yup.string().matches(/^[a-zA-Z0-9_]+$/, 'Username must be alphanumeric with underscores only').required(),
    password: yup.string().test('is-valid', 'Invalid password', value => {
        if (!value) return false;
        for (let i = 0; i < value.length; i++) {
            if (i > 1 && (value[i] === value[i - 1] || value[i] === value[i - 2])) {
                return false;
            }
            if (value.split(value[i]).length > 3) {
                return false;
            }
        }
        return true;
    }).required()
});

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const router = useRouter();

    const onSubmit = (data) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        users.push(data);
        localStorage.setItem('users', JSON.stringify(users));
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
                <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;
