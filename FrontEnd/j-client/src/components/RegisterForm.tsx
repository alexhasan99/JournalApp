import React, { useState } from 'react';
import ApiService from '../services/ApiServices';
import { User } from "../interface/interface";

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('');

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Create a User object based on the form input
        const user: User = {
            email: email,
            name: name,
            password: password,
            userType: userType,
        };

        try {
            const registrationStatus = await ApiService.registerUser(user);

            if (registrationStatus) {
                // Registration successful, handle redirection or other actions
                alert('Registration successful!');
                // Redirect or perform other actions upon successful registration
            } else {
                // Handle registration failure
                alert('Registration failed');
            }
        } catch (error) {
            // Handle registration error
            console.error('Registration Error:', error);
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Role:
                    <select value={userType} onChange={(e) => setUserType(e.target.value)}>
                        <option value="">Select role</option>
                        <option value="PATIENT">Patient</option>
                        <option value="DOCTOR">Doctor</option>
                        <option value="OTHERS">Staff</option>
                    </select>
                </label>
                <br />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterForm;
