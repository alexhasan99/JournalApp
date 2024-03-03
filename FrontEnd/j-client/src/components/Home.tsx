import React, {useContext, useEffect, useState} from 'react';
import ApiService from '../services/ApiServices';
import { useNavigate } from 'react-router-dom';
import {Patient, PatientForPage, StaffMember, User} from "../interface/interface";
import {UserContext} from "./UserSession";
import ApiServices from "../services/ApiServices";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('');
    const [userId, setUserId] = useState<number| undefined>();
    const [patientDetails, setPatientDetails] = useState<PatientForPage>();
    const [staffDetails, setStaffDetails] = useState<StaffMember>();
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);


    useEffect(() => {
        if (patientDetails) {
            // Redirect after getting patient details
            const parsedUserId = Number(patientDetails.id); // Convert to a number
            if (!isNaN(parsedUserId)) {
                setUserId(parsedUserId); // Update userId state
                console.log("PatientDetails: " + parsedUserId);
                navigate(`/patient/${parsedUserId}`);
            } else {
                console.error("Invalid userId received from patientDetails:", patientDetails.id);
                // Handle the scenario where userId is not a valid number
            }
        }
    }, [navigate, patientDetails]);



    useEffect(() => {
        if (staffDetails) {
            // Redirect after getting patient details
            const parsedUserId = Number(staffDetails.id); // Convert to a number
            if (!isNaN(parsedUserId)) {
                setUserId(parsedUserId); // Update userId state
                console.log("PatientDetails: " + parsedUserId);
                navigate(`/staff/${parsedUserId}`);
            } else {
                console.error("Invalid userId received from patientDetails:", staffDetails.id);
                // Handle the scenario where userId is not a valid number
            }
        }
    }, [navigate, staffDetails]);


    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const user = { email, password, userType };
            const loginSuccess = await ApiService.loginUser(user);
            console.log('Login Sucess: ', user)

            if (loginSuccess) {
                let data;
                if (userType === 'PATIENT') {
                    data = await ApiService.getPatientByEmail(email);
                    setPatientDetails(data);
                } else if (userType === 'STAFF') {
                    data = await ApiServices.getStaffByEmail(email);
                    setStaffDetails(data);
                    console.log(data)
                }
                if (data && data.id) {
                    setUserId(data.id);
                    setUser({ userId: data.id, email, userType });
                    sessionStorage.setItem('currentUserLoggedIn', JSON.stringify({ id: data.id, email, userType, userId:data.user.id }));


                    alert('Login successful!\nYou wrote: ' + email + ', ' + userType);
                } else {
                    // Handle unexpected data format or missing data
                    alert('Failed to fetch user data');
                }
            } else {
                // Handle incorrect credentials
                alert('Invalid username or password');
            }
        } catch (error) {
            // Handle API fetch error
            console.error('Error:', error);
            alert('Error occurred during login');
        }
    };

    

    const handleRegister = () => {
        navigate("/registerForm");
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <label>
                    Email:
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        <option value="STAFF">Staff</option>
                    </select>
                </label>
                <br />
                <button type="submit">Login</button>
                <button onClick={handleRegister}>Register</button>
            </form>
        </div>
    );
};


export default LoginForm;

