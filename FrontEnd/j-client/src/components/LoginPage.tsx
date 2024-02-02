import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {users} from "../utils/mockData";

const LoginPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate loading for 1 second
        setTimeout(() => {
            const matchedUser = users.find(
                (user) => user.username === username && user.password === password
            );
            if (matchedUser) {
                setLoginStatus('Login successful');
                // Add logic for successful login
                if (matchedUser.role === 'patient') {
                    // Redirect to patient page
                    // Replace the URL with the correct route for the patient page
                    navigate('/patient');
                } else if (matchedUser.role === 'doctor') {
                    // Redirect to doctor page
                    // Replace the URL with the correct route for the doctor page
                    navigate('/doctor');
                }
            } else {
                setLoginStatus('Invalid credentials');
                // Add logic for handling invalid credentials
            }
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={handleUsernameChange} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </div>
                <button type="submit">Log in</button>
            </form>
            {isLoading && <p>Loading...</p>}
            {loginStatus && <p>{loginStatus}</p>}
        </div>
    );
};

export default LoginPage;
