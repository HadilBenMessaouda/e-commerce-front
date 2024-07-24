import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { signIn } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import image from '../assets/image.png';

export default function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: ({ username, password }) => signIn(username, password),
        onSuccess: (data) => {
            console.log('Successful sign-in:', data);
            localStorage.setItem('accessToken', data.accessToken); // Store accessToken in localStorage
            localStorage.setItem('refreshToken', data.refreshToken); // Store refreshToken in localStorage
           
            navigate('/dashboard'); // Navigate to dashboard after successful sign-in
        },
        onError: (error) => {
            setError('Invalid email or password');
            console.error('Sign-in error:', error);
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        mutation.mutate({ username, password });
    };

    return (
        <>
            <div className="flex min-h-full">
                <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                            className="mx-auto h-23 w-40"
                            src={image}
                            alt="Your Company"
                        />
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Sign in to your account
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                    Username
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        autoComplete="username"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                        Password
                                    </label>
                                    <div className="text-sm">
                                        <a href="#" className="font-semibold text-green-600 hover:text-green-500">
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            {error && <div className="text-red-500">{error}</div>}

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            Not a member?{' '}
                            <a href="/signup" className="font-semibold leading-6 text-green-600 hover:text-green-500">
                                Sign up
                            </a>
                        </p>
                    </div>
                </div>

                <div className="flex-1 hidden lg:flex items-center justify-center bg-gray-100">
                    <img
                        src="https://i.pinimg.com/564x/2e/fb/8b/2efb8b188ff4f1801b509a94cc438b2d.jpg"
                        alt="Description of the image"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </>
    );
}
