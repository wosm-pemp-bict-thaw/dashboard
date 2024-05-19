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
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Username</label>
                    <input {...register('username')} />
                    {errors.username && <p>{errors.username.message}</p>}
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" {...register('password')} />
                    {errors.password && <p>{errors.password.message}</p>}
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;
