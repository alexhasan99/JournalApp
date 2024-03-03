import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ApiService from '../services/ApiServices';
import {Patient, Msg, PatientForSearch} from "../interface/interface";
import ApiServices from "../services/ApiServices";
import PatientSearchForm from './PatientSearchForm';

interface MessageItemProps {
    message: Msg;
    handleReply: (receiverId: number, replyContent: string) => void;

}

const MessageItem: React.FC<MessageItemProps> = ({ message, handleReply }) => {
    const [newReplyContent, setNewReplyContent] = useState('');
    const [senderName, setSenderName] = useState('');
    const [messageSent, setMessageSent] = useState(false);

    const handleSendReply = async () => {
        try {
            // Call handleReply and pass the receiver's userId and newReplyContent
            await handleReply(message.sender, newReplyContent);
            setMessageSent(true); // Set message sent to true after successful send
            alert("Message successfully sent!");
            setNewReplyContent(''); // Clear the reply input after sending
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    useEffect(() => {
        const fetchSenderName = async () => {
            try {
                const senderData = await ApiServices.getPatientByUserId(message.sender);
                if (senderData) {
                    setSenderName(senderData.name || 'Unknown');
                } else {
                    setSenderName('Unknown');
                }
            } catch (error) {
                console.error('Error fetching sender data:', error);
                setSenderName('Unknown');
            }
        };

        fetchSenderName();
    }, [message.sender]);



    return (
        <div>
            <p>Content: {message.messageText}</p>
            <p>Sender: {senderName}</p>
            {/* Display other message details */}
            {!messageSent && (
                <div>
                    <h4>Reply</h4>
                    <input
                        type="text"
                        value={newReplyContent}
                        onChange={(e) => setNewReplyContent(e.target.value)}
                        placeholder="Type your reply..."
                    />
                    <button onClick={handleSendReply}>Send Reply</button>
                </div>
            )}

        </div>
    );
};

const DoctorPage = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [messages, setMessages] = useState<Msg[]>([]);
    const [getAllSentMessages, setAllSentMessages] = useState<Msg[]>([]);
    const [getAllReceviedMessages, setAllReceviedMessages] = useState<Msg[]>([]);
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const [searchedPatients, setSearchedPatients] = useState<PatientForSearch[]>([]); // State för sökta patienter


    const fetchMessages = async (userId: number) => {
        try {
            console.log(userId)
            ApiServices.getAllSentMessagesForUser(userId).then(setAllSentMessages);
            ApiServices.getAllReceivedMessagesForUser(userId).then(setAllReceviedMessages);
            console.log(getAllSentMessages)
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };
    const handleSearchComplete = (searchResults: PatientForSearch[]) => {
        console.log(searchResults)

        setSearchedPatients(searchResults); // Spara sökresultaten i state
        //console.log(searchResults)
    };
    useEffect(() => {
        // Fetch list of patients when the component mounts
        const fetchPatients = async () => {
            try {
                const fetchedPatients = await ApiService.getPatients(); // Fetch patients from API
                setPatients(fetchedPatients); // Set the fetched patients in state
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };

        const userIdFromSession = sessionStorage.getItem('currentUserLoggedIn');
        if (userIdFromSession) {
            const { userId } = JSON.parse(userIdFromSession);
            fetchMessages(userId); // Fetch messages for the logged-in doctor (using userId)
        }
        fetchPatients();
    }, []);

    const handleReply = async (receiverId: number, replyContent: string) => {
        try {
            if (replyContent) {
                const userIdFromSession2 = sessionStorage.getItem('currentUserLoggedIn');
                let senderId = 0;
                if (userIdFromSession2) {
                    const { userId } = JSON.parse(userIdFromSession2);
                    senderId = userId;
                }
                // Here, you can set the selectedPatient based on the receiverId
                const selectedPatient = patients.find((patient) => patient.id === receiverId);
                setSelectedPatient(selectedPatient || null);

                const messageData = {
                    messageText: replyContent,
                    timeStamp: new Date().toISOString(),
                    sender: senderId,
                    receiver: receiverId,
                };
                await ApiService.createMessage(messageData);

                // Fetch updated messages for the logged-in doctor after sending the reply
                const userIdFromSession = sessionStorage.getItem('currentUserLoggedIn');
                if (userIdFromSession) {
                    const { userId } = JSON.parse(userIdFromSession);
                    fetchMessages(userId);
                }

                //setNewMessageContent('');
            } else {
                console.error('Missing reply content or selected patient');
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div>
            <h2>Messages</h2>
            <ul>
                {getAllReceviedMessages.map((message) => (
                    <li key={message.timeStamp}>
                        <MessageItem message={message} handleReply={handleReply}/>
                    </li>
                ))}
            </ul>

            {/* Other components or sections */}
            <h3>List of Patients</h3>
            <ul>
                {patients.map((patient) => (
                    <li key={patient.id}>
                        {patient.firstname} - {patient.id}
                        <Link to={`/staff/selectedPatient/${patient.id}`}>
                            <button>Select Patient</button>
                        </Link>
                    </li>
                ))}
            </ul>
            <h3>Search For Patients</h3>
            <PatientSearchForm onSearchComplete={handleSearchComplete} />

            {/* Visa sökresultaten efter patients*/}
            <div>
                <h3>Searched Patients</h3>
                {searchedPatients.length > 0 ? (
                    <ul>
                        {searchedPatients.map((patient) => (
                            <li key={patient.lastName}>
                                <strong>Name:</strong> {patient.firstName} {patient.lastName} <br/>
                                <strong>Email:</strong> {patient.email} <br/>
                                <strong>Gender:</strong> {patient.gender}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No patients found</p> // Visa detta om inga träffar görs vid sökning
                )}
            </div>

        </div>

    );
};

export default DoctorPage;


//<button onClick={() => handleReply(selectedPatient?.userId || 0)}>Reply</button>