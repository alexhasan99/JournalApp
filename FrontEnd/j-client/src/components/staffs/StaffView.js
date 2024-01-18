// StaffView.js
import React from 'react';
import './StaffView.css'; // Import the CSS file for styling


const StaffView = ({ staffDetails }) => {
  return (
    <div>
      <h2>Staff Details</h2>
      <p>ID: {staffDetails.id}</p>
      <p>First Name: {staffDetails.firstName}</p>
      <p>Last Name: {staffDetails.lastName}</p>
      <p>Email: {staffDetails.email}</p>
      <p>Gender: {staffDetails.gender}</p>
      <p>Type of Staff: {staffDetails.staffType}</p>
      {/* Additional details can be displayed as needed */}
    </div>
  );
};

export default StaffView;
