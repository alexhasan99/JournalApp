// PatientView.js
import React from 'react';
import './PatientView.css'; // Import the CSS file for styling

const PatientView = ({ patient }) => {
  return (
    <div>
      <h2>Patient Details</h2>
      <p>ID: {patient.id}</p>
      <p>First Name: {patient.firstName}</p>
      <p>Last Name: {patient.lastName}</p>
      <p>Email: {patient.email}</p>
      <p>Gender: {patient.gender}</p>
      {/* Additional details can be displayed as needed */}
    </div>
  );
};

export default PatientView;
