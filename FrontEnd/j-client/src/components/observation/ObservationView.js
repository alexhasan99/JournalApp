// C.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// Adjust import paths based on your actual project structure
import PatientView from '../patients/PatientView';
import StaffView from '../staffs/StaffView';
import './ObservationView.css'; // Import the CSS file for styling
import Navigation from '../Navigation/Navigation';



const ObservationView = () => {
  const [observations, setObservations] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  console.log("hej");
  useEffect(() => {
    loadObservations();
  }, []);

  const loadObservations = async () => {
    try {
      const result = await axios.get('http://localhost:8080/api/observations');
      setObservations(result.data);
      console.log('Hello');
      console.log('Observation data:', result.data);
  } catch (error) {
      console.error('Error fetching observations:', error);
    }
  };

  const loadPatientDetails = async (patientId) => {
    try {
      const result = await axios.get(`http://localhost:8080/api/patients/${patientId}`);
      setSelectedPatient(result.data);
    } catch (error) {
      console.error('Error fetching patient details:', error);
    }
  };

  const loadStaffDetails = async (staffId) => {
    try {
      const result = await axios.get(`http://localhost:8080/api/staffs/${staffId}`);
      setSelectedStaff(result.data);
    } catch (error) {
      console.error('Error fetching staff details:', error);
    }
  };

  return (
    <>
    <Navigation/>
    <section>
      <table>
        <thead>
          <tr>
          <th>Type of Observation</th>
            <th>Date of observation</th>
            <th>Description of observation</th>
          </tr>
        </thead>
        <tbody>
          {observations.map((observation, index) => (
            <tr key={observation.id}>
              <td>{observation.type}</td>
              <td>{observation.observationDate}</td>
              <td>{observation.observationText}</td>
              <td>
                <button onClick={() => loadPatientDetails(observation.patient.id)}>
                  View Patient
                </button>
              </td>
              <td>
                <button onClick={() => loadStaffDetails(observation.staff.id)}>
                  View Staff
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedPatient && <PatientView patientDetails={selectedPatient} />}
      {selectedStaff && <StaffView staffDetails={selectedStaff} />}
    </section>
    </>
  );
};

export default ObservationView;
