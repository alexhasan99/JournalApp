import React, {useContext, useState} from 'react';
import LoginPage from './components/LoginPage';
import PatientPage from './components/PatientPage';
import DoctorPage from './components/DoctorPage';
import RegisterForm from "./components/RegisterForm";
import {BrowserRouter, Link, Navigate, Route, Router, Routes, useNavigate} from "react-router-dom";
import Home from "./components/Home";
import {UserProvider} from "./components/UserSession";
import PrivateRoute from "./components/PrivateRoute";
import SelectedPatientPage from "./components/SelectedPatientPage";
//import Login from './Login';
import Login from './TestLogin';
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
                        <li><Link to="/staff">Doctor Page</Link></li>
                        <li><Link to="/registerForm">Register</Link></li>
                    </ul>
                    <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                        <Route path="/patient/:patientId" element={<PrivateRoute allowedUserTypes={['PATIENT']} ><PatientPage /></PrivateRoute>} />
                        <Route path="/staff/selectedPatient/:patientId" element={<PrivateRoute  allowedUserTypes={['STAFF']} ><SelectedPatientPage /></PrivateRoute>} />
                        <Route path="/staff/:staffId"  element={<PrivateRoute  allowedUserTypes={['STAFF']} ><DoctorPage /></PrivateRoute>}/>
                        <Route path="/registerForm" element={<RegisterForm />} />
                    </Routes>
                </div>
            </UserProvider>
        </BrowserRouter>
    );
}

export default App;
