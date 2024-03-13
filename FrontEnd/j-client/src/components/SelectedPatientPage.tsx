import React, {useEffect, useState, CSSProperties } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {EncounterForDisplay, Msg, Observation, Patient} from "../interface/interface";
import ApiServices from "../services/ApiServices";
import ApiService from "../services/ApiServices";
import DrawingForm from "./DrawingForm";


const SelectedPatientPage = () => {
    const {patientId} = useParams<{ patientId?: string }>();
    const [patientDetails, setPatientDetails] = useState<Patient>(); // Update 'any' with the actual patient details interface/type
    const [previousEncounters, setPreviousEncounters] = useState<EncounterForDisplay[]>([]);
    const [messages, setMessages] = useState<Msg[]>([]);
    const [messagesReply, setMessagesReply] = useState<Msg[]>([]);
    const [previousObservations, setPreviousObservations] = useState<Observation>();
    const [listOfEncounterIds, setListOfEncounterIds] = useState<number[]>([]);
    const [note, setNote] = useState('');
    const [encounterId, setEncounterId] = useState('');
    const [userId, setUserId] = useState('');
    const [conditions, setConditions] = useState<string[]>([]);
    const [expandedEncounterId, setExpandedEncounterId] = useState<number | null>(null);
    const toggleExpand = (encounterId: number) => {
        if (expandedEncounterId === encounterId) {
            setExpandedEncounterId(null); // Collapse if already expanded
        } else {
            setExpandedEncounterId(encounterId); // Expand clicked encounter
        }
    };
    const navigate = useNavigate();

    useEffect(() => {
        if (patientId) {
            ApiServices.getPatientById(parseInt(patientId)).then((data) => {
                setPatientDetails(data);
                const userId = data?.user.id ?? 0; // Use nullish coalescing operator to handle undefined
                setUserId(String(userId)); 
                console.log(userId)// Update userId here once patientDetails are fetched
                sessionStorage.setItem("patientId", patientId);
            });
        }
    }, [patientId]);

    useEffect(() => {
        if(patientId) {
            ApiServices.getAllEncountersByUserId(parseInt(patientId)).then((data) => setPreviousEncounters(data));

        }
    }, [patientDetails]);

    useEffect(() => {
        // Fetch messages using the getConversationBySenderAndReceiver method
        const fetchMessages = async () => {
            try {
                let doctorId = 0;
                const userIdFromSession = sessionStorage.getItem("currentUserLoggedIn");
                if(userIdFromSession){
                    const { userId } = JSON.parse(userIdFromSession);
                    doctorId = userId;
                }

                // Fetch messages based on sender and receiver userIds
                const conversationMessagesFromSender = await ApiServices.getConversationBySenderAndReceiver(
                    parseInt(userId),// Patient's userId
                    doctorId// Current user's userId
                );
                console.log(conversationMessagesFromSender)
                setMessages(conversationMessagesFromSender || []); // Set fetched messages in state

                const conversationMessagesReply = await ApiServices.getConversationBySenderAndReceiver(
                    doctorId,
                    parseInt(userId)
                );
                setMessagesReply(conversationMessagesReply || []);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        if (userId) {
            fetchMessages();
        }
    }, [userId]);

    const handleAddCondition = () => {
        if (conditions && conditions.length >= 0) {
            const updatedConditions = [...conditions, '']; // Add an empty string for a new condition
            setConditions(updatedConditions);
        }
    };

    const handleConditionChange = (index: number, value: string) => {
        const updatedConditions = [...conditions];
        updatedConditions[index] = value;
        setConditions(updatedConditions);
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

    const handleAddNote = async () => {
        try {

            // Create the encounter first
            const encounterData = {
                userId: parseInt(userId || ''),

                timeStamp: new Date().toISOString()

            };
            const encounterCreation = await ApiServices.createEncounter(encounterData);


            if (encounterCreation) {
                // If encounter creation was successful, add the observation
                const observationData = {
                    observationText: note,
                    observationDate: new Date().toISOString(),
                    type: 'conditions',
                };
                console.log("Encounter is: " + encounterCreation);


                // Create the observation associated with the encounter
            const observationCreation = await ApiServices.addObservationToEncounter(encounterCreation, observationData);

                if (observationCreation) {
                    // Observation created successfully and associated with the encounter
                    console.log('Observation created:', observationCreation);
                    // Perform any necessary action after successful creation
                } else {
                    console.error('Failed to create observation');
                    // Handle failed observation creation
                }
            } else {
                console.error('Failed to create encounter');
                // Handle failed encounter creation
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle any other errors here
        }
    };

    const styles: { [key: string]: CSSProperties } = {
        container: {
            padding: '20px',
            maxWidth: '800px',
            margin: '20px auto',
            fontFamily: 'Arial, sans-serif',
        },
        section: {
            marginBottom: '20px',
        },
        encounterSection: {
            cursor: 'pointer',
            marginTop: '10px',
            padding: '10px',
            background: '#f0f0f0',
            borderRadius: '5px',
        },
        messagesSection: {
            background: '#e9ecef',
            padding: '10px',
            borderRadius: '5px',
        },
        messageItem: {
            padding: '5px 10px',
            borderRadius: '5px',
            background: '#f8f9fa',
            margin: '5px 0',
        },
        textarea: {
            width: '100%',
            padding: '10px',
            margin: '10px 0',
            borderRadius: '5px',
            border: '1px solid #ccc',
            boxSizing: 'border-box',
        },
        button: {
            background: '#007bff',
            color: 'white',
            padding: '10px 15px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            margin: '5px 0',
        },
        input: {
            padding: '10px',
            margin: '10px 0',
            borderRadius: '5px',
            border: '1px solid #ccc',
            width: 'calc(100% - 22px)',
        },
        heading: {
            color: '#007bff',
        },
    };


    return (
        <div style={styles.container}>
            {patientDetails && (
                <div style={styles.section}>
                    <h2 style={styles.heading}>Patient Details</h2>
                    <p>Name: {patientDetails.firstname}</p>
                    <p>Email: {patientDetails.email}</p>
                    {/* Antag att du har fler patientdetaljer att visa här */}
                </div>
            )}
    
            <textarea
                style={styles.textarea}
                placeholder="Add note/message"
                value={note}
                onChange={(e) => setNote(e.target.value)}
            ></textarea>
            <button style={styles.button} onClick={handleAddCondition}>Add Conditions</button>
            {conditions.map((condition, index) => (
                <div key={index}>
                    <input
                        style={styles.input}
                        type="text"
                        value={condition}
                        onChange={(e) => handleConditionChange(index, e.target.value)}
                        placeholder={`Condition ${index + 1}`}
                    />
                </div>
            ))}
    
            <div style={styles.section}>
                <h3 style={styles.heading}>Messages</h3>
                <div style={styles.messagesSection}>
                    <h4 style={{ ...styles.heading, fontSize: '18px' }}>From Patients</h4>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {messages.map((message, index) => (
                            <li key={index} style={styles.messageItem}>
                                <p>Content: {message.messageText}</p>
                                {/* Kanske vill du visa mer information här */}
                                <ul style={{ listStyleType: 'none', padding: '0' }}>
                                    {messagesReply
                                        .filter((reply) => reply.sender === message.receiver && reply.receiver === message.sender)
                                        .map((messagereply, replyIndex) => (
                                            <li key={replyIndex} style={{ ...styles.messageItem, background: '#d1ecf1' }}>
                                                <p>My Replies: {messagereply.messageText}</p>
                                            </li>
                                        ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
    
            <div style={styles.section}>
                <h3 style={styles.heading}>Previous Encounters</h3>
                {previousEncounters.map((encounter, index) => (
                    <div key={index} style={styles.encounterSection} onClick={() => toggleExpand(encounter.id)}>
                        <h4>Encounter ⬇ {formattedDate(encounter.encounterDate)}</h4>
                        {expandedEncounterId === encounter.id && (
                            <div>
                                <p>Time: {formattedTime(encounter.encounterDate)}</p>
                                <p>EncounterId: {encounter.id}</p>
                                <p>Encounter Location: {encounter.location}</p>
                                <div>
                                    <h4>Observations</h4>
                                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                                        {encounter.observations.map((observation, obsIndex) => (
                                            <li key={obsIndex} style={styles.messageItem}>
                                                <p>Type: {observation.type}</p>
                                                <p>Message: {observation.observationText}</p>
                                                <p>Observation Date: {formattedDate(observation.observationDate)}</p>
                                                {/* Ytterligare observationdetaljer */}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <ul>
            <DrawingForm/>
            </ul>
        </div>
    );
};

export default SelectedPatientPage;
