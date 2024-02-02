import React, {useState, useEffect, FormEvent, ChangeEvent} from 'react';
// import ApiService from '../services/ApiServices'; // Du måste implementera denna service

import {useParams} from "react-router-dom";
import {Doctor, EncounterForDisplay, Msg, Others, Patient} from "../interface/interface";
import ApiServices from "../services/ApiServices";

const PatientPage = () => {
    const {patientId} = useParams<{ patientId?: string }>();
    const [patientDetails, setPatientDetails] = useState<Patient>(); // Update 'any' with the actual patient details interface/type
    const [doctorList, setDoctorList] = useState<Doctor[]>([]);
    const [otherList, setOtherList] = useState<Others[]>([]);
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
    const [allMessages, setAllMessages] = useState<Msg[]>([]);
    const [selectedDoctorId, setSelectedDoctorId] = useState('');
    const [selectedDoctorName, setSelectedDoctorName] = useState('');

    useEffect(() => {
        if (patientId) {

            // Fetch patient details based on the patientId using an API call or local storage
            ApiServices.getUserIdByPatientId(parseInt(patientId)).then((data) => setUserId(data));
            ApiServices.getPatientById(parseInt(patientId)).then((data) => setPatientDetails(data));

        }
    }, [patientId]);

    useEffect(() => {
        if(userId) {
            ApiServices.getAllEncountersByUserId(parseInt(userId)).then((data) => setPreviousEncounters(data));
            ApiServices.getAllMessagesForUser(parseInt(userId)).then((data) => setAllMessages(data));
        }
    }, [userId]);

    useEffect(() => {
        ApiServices.getDoctorInfo().then((data) => setDoctorList(data));
        ApiServices.getOthers().then((data) => setOtherList(data));
    },[]);

    const sendMessage = (staffId: number, staffType: 'doctor' | 'other') => {
        const message = {
            timeStamp: new Date().toISOString(),
            sender: parseInt(userId),
            receiver: staffId,
            content: staffType === 'doctor' ? newDoctorMessage : newOtherMessage,
            // Add other necessary properties for the message
        };

        // Call the API to send the message
        ApiServices.createMessage(message).then((response) => {
            if (staffType === 'doctor') {
                setNewDoctorMessage('');
            } else {
                setNewOtherMessage('');
            }
        });
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
                    <p>Name: {patientDetails.name}</p>
                    <p>Email: {patientDetails.email}</p>

                    <div>
                        <h3>Available Staff</h3>
                        <div>
                            <h4>Doctors</h4>
                            <ul>
                                {doctorList.map((doctor, index) => (
                                    <li key={index}>
                                        {/* Display doctor information */}
                                        <p>Name: {doctor.name}</p>
                                        <p>Email: {doctor.email}</p>
                                        <input
                                            type="text"
                                            value={newDoctorMessage}
                                            onChange={(e) => setNewDoctorMessage(e.target.value)}
                                            placeholder="Write your message"
                                        />
                                        <button onClick={() => sendMessage(doctor.userId, 'doctor')}>Message</button>
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
                                        <p>Name: {other.name}</p>
                                        <p>Email: {other.email}</p>
                                        <input
                                            type="text"
                                            value={newOtherMessage}
                                            onChange={(e) => setNewOtherMessage(e.target.value)}
                                            placeholder="Write your message"
                                        />
                                        <button onClick={() => sendMessage(other.userId, 'other')}>Message</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div>
                        <h3>Messages</h3>
                        {allMessages.map((msg, index) => (
                            <div key={index}>
                                <p>Content: {msg.content}</p>
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
                                    <h4 onClick={() => toggleExpand(encounter.id)}>Encounter ⬇ {formattedDate(encounter.timeStamp)}</h4>
                                    {expandedEncounterId === encounter.id && (
                                        <div>
                                            {/* Render encounter details */}
                                            <p>Time: {formattedTime(encounter.timeStamp)}</p>
                                            <p>EncounterId: {encounter.id}</p>
                                            <div>
                                                <h4>Observations</h4>
                                                <ul>
                                                    {encounter.observations.map((observation, obsIndex) => (
                                                        <li key={obsIndex}>
                                                            {/* Render observation details */}
                                                            <p>Message: {observation.msg}</p>

                                                            <p>Conditions: {observation.conditions.join(', ')}</p>
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
