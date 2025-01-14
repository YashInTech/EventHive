import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const LoginForm = ({ onSubmit }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            login(data); // Pass the response data to the AuthContext
            onSubmit(data); // Callback for handling submit externally (if needed)
        } catch (err) {
            console.error(err);
            setError(err.message || 'Login failed!');
        }
    };

    return (
        <div className="flex h-screen bg-gray-200">
            {/* Left Section - Yellow Background with Text Box */}
            <div
                className="flex-1 w-screen bg-yellow-300 flex justify-center items-center"
                style={{ height: '100%' }}
            >
                <div className="p-8 rounded-lg text-center max-w-md ">
                    <h1 className="font-bold font-serif sm:text-[40px] text-[10px] text-left mt-12 text-black">
                        Seamless event planning at your fingertips. <br /> <br />
                        Manage every detail with simplicity and precision.
                    </h1>
                </div>
            </div>

            {/* Right Section - Login Form */}
            <div
                className="flex-1 w-screen flex justify-center items-center"
                style={{ height: '100%' }}
            >
                <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                    <h2 className="text-left font-serif text-3xl mb-3">Welcome Back</h2>
                    <p className='text-left text-lg mb-3'>We are happy to have you back.</p>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <input
                                placeholder="Email"
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />
                        </div>
                        <div>
                            <input
                                placeholder="Password"
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Login
                        </button>
                        <p className="text-center mt-4">
                            Do not have an account?{' '}
                            <a href="/Register" className="text-blue-600 hover:underline">
                                Create Account
                            </a>
                        </p>
                        <p className="text-xs text-center mt-4">
                            By logging in or signing up, you agree to EventHive's Terms & Conditions and Privacy Policy.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;