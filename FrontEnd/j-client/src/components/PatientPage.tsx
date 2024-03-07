import React, {useState, useEffect, FormEvent, ChangeEvent} from 'react';
// import ApiService from '../services/ApiServices'; // Du måste implementera denna service

import {useParams} from "react-router-dom";
import {EncounterForDisplay, Msg, Patient} from "../interface/interface";
import {StaffMember} from "../interface/interface";
import ApiServices from "../services/ApiServices";
import { number } from 'prop-types';

const PatientPage = () => {
    const {patientId} = useParams<{ patientId?: string }>();
    const [patientDetails, setPatientDetails] = useState<Patient>(); // Update 'any' with the actual patient details interface/type
    const [doctorList, setStaffInfo] = useState<StaffMember[]>([]);
    const [otherList, setOtherList] = useState<StaffMember[]>([]);
    const [previousEncounters, setPreviousEncounters] = useState<EncounterForDisplay[]>([]);
    const [expandedEncounterId, setExpandedEncounterId] = useState<number | null>(null);
    const toggleExpand = (encounterId: number) => {
        if (expandedEncounterId === encounterId) {
            setExpandedEncounterId(null); // Collapse if already expanded
        } else {
            setExpandedEncounterId(encounterId); // Expand clicked encounter
        }
    };
    const [userId, setUserId] = useState('');
    const [patientInfo, setPatientInfo] = useState(null); // Använd för att lagra patientinformation
    const [newDoctorMessage, setNewDoctorMessage] = useState('');
    const [newOtherMessage, setNewOtherMessage] = useState('');
    const [getAllSentMessages, setAllSentMessages] = useState<Msg[]>([]);
    const [getAllReceviedMessages, setAllReceviedMessages] = useState<Msg[]>([]);
    const [selectedDoctorId, setSelectedDoctorId] = useState('');
    const [selectedDoctorName, setSelectedDoctorName] = useState('');

    useEffect(() => {
        if (patientId) {
            // Fetch patient details based on the patientId using an API call
            ApiServices.getPatientById(parseInt(patientId)).then((data) => {
                setPatientDetails(data);
                const senderId = data?.user.id ?? 0; // Use nullish coalescing operator to handle undefined
                setUserId(String(senderId)); // Update userId here once patientDetails are fetched
            });
            ApiServices.getAllEncountersByUserId(parseInt(patientId)).then(setPreviousEncounters);
        }
    }, [patientId]);

    useEffect(() => {
        const senderId = parseInt(userId);
    if (senderId) {
        ApiServices.getAllSentMessagesForUser(senderId).then(setAllSentMessages);
        ApiServices.getAllReceivedMessagesForUser(senderId).then(setAllReceviedMessages);
    }
    }, [patientDetails]);

    useEffect(() => {
        ApiServices.getStaffInfo().then((data: StaffMember[]) => {
            // Filtrera baserat på staffType
            const doctors = data.filter(item => item.staffType === 'Doctor');
            const others = data.filter(item => item.staffType !== 'Doctor');
            
            // Antag att setStaffInfo och setOtherList förväntar sig listor av StaffMember
            setStaffInfo(doctors);
            setOtherList(others);
        });
    },[]);

    const sendMessage = (staffId: number, staffType: 'doctor' | 'other') => {

        var senderId = patientDetails?.user.id
        if (!senderId){
            senderId = 0;
        }

        const message = {
            timeStamp: new Date().toISOString(),
            sender: senderId,
            receiver: staffId,
            messageText: staffType === 'doctor' ? newDoctorMessage : newOtherMessage,
            // Add other necessary properties for the message
        };

        // Call the API to send the message
        ApiServices.createMessage(message).then((response) => {
            console.log('sucesses')
            if (staffType === 'doctor') {
                setNewDoctorMessage('');
            } else {
                setNewOtherMessage('');
            }
        });

        console.log(message)
    };


    const formattedDate = (timestamp: string) => {
        const date = new Date(timestamp);
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };

    const formattedTime = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString();
    };


    return (
        <div>
            {patientDetails && (
                <div>
                    <h2>Patient Details</h2>
                    <p>First Name: {patientDetails.firstname}</p>
                    <p>Last Name: {patientDetails.lastname}</p>
                    <p>Gender: {patientDetails.gender}</p>
                    <p>Email: {patientDetails.email}</p>

                    <div>
                        <h3>Available Staff</h3>
                        <div>
                            <h4>Doctors</h4>
                            <ul>
                                {doctorList.map((doctor, index) => (
                                    <li key={index}>
                                        {/* Display doctor information */}
                                        <p>First Name: {doctor.firstname}</p>
                                        <p>Last Name: {doctor.lastname}</p>
                                        <p>Email: {doctor.email}</p>
                                        <input
                                            type="text"
                                            value={newDoctorMessage}
                                            onChange={(e) => setNewDoctorMessage(e.target.value)}
                                            placeholder="Write your message"
                                        />
                                        <button onClick={() => sendMessage(doctor.user.id, 'doctor')}>Message</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4>Others</h4>
                            <ul>
                                {otherList.map((other, index) => (
                                    <li key={index}>
                                        {/* Display other staff information */}
                                        <p>First Name: {other.firstname}</p>
                                        <p>Last Name: {other.lastname}</p>
                                        <p>Email: {other.email}</p>
                                        <p>Type: {other.staffType}</p>
                                        <input
                                            type="text"
                                            value={newOtherMessage}
                                            onChange={(e) => setNewOtherMessage(e.target.value)}
                                            placeholder="Write your message"
                                        />
                                        <button onClick={() => sendMessage(other.user.id, 'other')}>Message</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div>
                        <h3>Messages</h3>
                        <h4>Sent Messages</h4>
                        {getAllSentMessages
            .map((msg, index) => (
                            <div key={index}>
                                <p>Content: {msg.messageText}</p>
                                <p>Timestamp: {formattedDate(msg.timeStamp)}</p>
                                <p>Sender: {msg.sender}</p>
                                <p>Receiver: {msg.receiver}</p>
                            </div>
                        ))} 
                        <h4>Recevied Messages</h4>
                        {getAllReceviedMessages
            .map((msg, index) => (
                            <div key={index}>
                                <p>Content: {msg.messageText}</p>
                                <p>Timestamp: {formattedDate(msg.timeStamp)}</p>
                                <p>Sender: {msg.sender}</p>
                                <p>Receiver: {msg.receiver}</p>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h3>Previous Encounters</h3>
                        <div>
                            {previousEncounters.map((encounter, index) => (
                                <div key={index}>
                                    <h4 onClick={() => toggleExpand(encounter.id)}>Encounter ⬇ {formattedDate(encounter.encounterDate)}</h4>
                                    {expandedEncounterId === encounter.id && (
                                        <div>
                                            {/* Render encounter details */}
                                            <p>Time: {formattedTime(encounter.encounterDate)}</p>
                                            <p>EncounterId: {encounter.id}</p>
                                            <p>Encounter Location: {encounter.location}</p>
                                            <div>
                                                <h4>Observations</h4>
                                                <ul>
                                                    {encounter.observations.map((observation, obsIndex) => (
                                                        <li key={obsIndex}>
                                                            {/* Render observation details */}
                                                            <p>Type: {observation.type}</p>
                                                            <p>Message: {observation.observationText}</p>
                                                            <p>Observation Date: {formattedDate(observation.observationDate)}</p>
                                                            {/* Other observation details */}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );


};

export default PatientPage;
