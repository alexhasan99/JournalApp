import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ApiService from '../services/ApiServices';
import { Patient, Msg } from "../interface/interface";
import ApiServices from "../services/ApiServices";

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
            <p>Content: {message.content}</p>
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

const StaffPage = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [messages, setMessages] = useState<Msg[]>([]);
    const [newMessageContent, setNewMessageContent] = useState('');
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

    const fetchMessages = async (userId: number) => {
        try {
            const fetchedMessages: Msg[] = await ApiService.getAllMessagesForUser(userId);
            const filteredMessages = fetchedMessages.filter((message: Msg) => message.sender !== userId);
            setMessages(filteredMessages); // Set the fetched messages in state
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
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
            fetchMessages(userId);
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
                const selectedPatient = patients.find((patient) => patient.userId === receiverId);
                setSelectedPatient(selectedPatient || null);

                const messageData = {
                    content: replyContent,
                    timeStamp: new Date().toISOString(),
                    sender: senderId,
                    receiver: receiverId,
                };
                await ApiService.createMessage(messageData);


                const userIdFromSession = sessionStorage.getItem('currentUserLoggedIn');
                if (userIdFromSession) {
                    const { userId } = JSON.parse(userIdFromSession);
                    fetchMessages(userId);
                }

                setNewMessageContent('');
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
                {messages.map((message) => (
                    <li key ={message.timeStamp}>
                        <MessageItem message={message} handleReply={handleReply} />
                    </li>
                ))}
            </ul>


            {/* Other components or sections */}
            <h3>List of Patients</h3>
            <ul>
                {patients.map((patient) => (
                    <li key={patient.userId}>
                        {patient.name} - {patient.userId}
                        <Link to={`/doctor/selectedPatient/${patient.userId}`}>
                            <button>Select Patient</button>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>

    );
};

export default StaffPage;
