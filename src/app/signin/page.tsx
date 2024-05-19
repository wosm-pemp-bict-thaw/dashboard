'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

const SignIn = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();

    const onSubmit = (data: { username: string, password: string }) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find((user: { username: string, password: string }) => user.username === data.username && user.password === data.password);
        if (user) {
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            router.push('/');
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Username</label>
                    <input {...register('username', { required: true })} />
                    {errors.username && <p>Username is required</p>}
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" {...register('password', { required: true })} />
                    {errors.password && <p>Password is required</p>}
                </div>
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};

export default SignIn;
