import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { signUp } from '../services/authService';
import PropTypes from 'prop-types';
import image from '../assets/image.png';
import { useNavigate } from 'react-router-dom';


function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const [error, setError] = useState('');
    const navigate = useNavigate();


    const mutation = useMutation({
        mutationFn: ({ username, email, password}) =>
             signUp(username, email, password
    ),
        onSuccess: () => {
            navigate('/signin');
        },
        onError: () => {
            setError('Signup failed');
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        mutation.mutate({username, email, password });
    };
    console.log(username,email,password,'aaaaaaaaaaaaaaaaaaaaaaa')

    return (
        <div className="flex min-h-full">
            <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-23  w-40" src={image} alt="Your Company" />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign up to your account
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
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
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
                                Sign up
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        You have an account?{' '}
                        <a href="/signin" className="font-semibold leading-6 text-green-600 hover:text-green-500">
                            Sign in
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
        
    );
}

Signup.propTypes = {
    navigate: PropTypes.object.isRequired,
};

export default Signup;
