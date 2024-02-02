import React, {useContext, useState} from 'react';
import LoginPage from './components/LoginPage';
import PatientPage from './components/PatientPage';
import DoctorPage from './components/DoctorPage';
import StaffPage from './components/StaffPage';
import RegisterForm from "./components/RegisterForm";
import {BrowserRouter, Link, Navigate, Route, Router, Routes, useNavigate} from "react-router-dom";
import Home from "./components/Home";
import {UserProvider} from "./components/UserSession";
import {UserContext} from "./components/UserSession";
import PrivateRoute from "./components/PrivateRoute";
import SelectedPatientPage from "./components/SelectedPatientPage";
import ApiServices from "./services/ApiServices";
import {Patient} from "./interface/interface";






function App() {

    let user = null;
    if (sessionStorage.length > 0) {
        const storedUser = sessionStorage.getItem('currentUserLoggedIn');
        user = storedUser ? JSON.parse(storedUser) : null;
        console.log("User: " + user?.userId);
    }

    return (
        <BrowserRouter>
            <UserProvider>
                <div>
                    <h1>My App</h1>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to={`/patient/${user?.userId}`}>Patient Page</Link></li>
                        <li><Link to="/doctor">Doctor Page</Link></li>
                        <li><Link to="/staff">Staff Page</Link></li>
                        <li><Link to="/registerForm">Register</Link></li>
                    </ul>
                    <Routes>
                        <Route path="/" element={<Home/>}/>

                        <Route path="/patient/:patientId" element={<PrivateRoute allowedUserTypes={['PATIENT']} ><PatientPage /></PrivateRoute>} />
                        <Route path="/doctor" element={<PrivateRoute  allowedUserTypes={['DOCTOR']} ><DoctorPage /></PrivateRoute>} />
                        <Route path="/doctor/selectedPatient/:patientId" element={<PrivateRoute  allowedUserTypes={['DOCTOR', 'OTHERS']} ><SelectedPatientPage /></PrivateRoute>} />
                        <Route path="/staff"  element={<PrivateRoute  allowedUserTypes={['OTHERS']} ><StaffPage /></PrivateRoute>}/>
                        <Route path="/registerForm" element={<RegisterForm />} />
                    </Routes>
                </div>
            </UserProvider>
        </BrowserRouter>
    );
}

export default App;
