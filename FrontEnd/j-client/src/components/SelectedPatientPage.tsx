import React, {useEffect, useState} from 'react';
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
                setUserId(String(userId)); // Update userId here once patientDetails are fetched
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
                    parseInt(userId || '0'),// Patient's userId
                    doctorId// Current user's userId
                );
                setMessages(conversationMessagesFromSender || []); // Set fetched messages in state

                const conversationMessagesReply = await ApiServices.getConversationBySenderAndReceiver(
                    doctorId,
                    parseInt(userId || '0')
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


    return (
        <div>
            {patientDetails && (
                <div>
                    <h2>Patient Details</h2>
                    <p>Name: {patientDetails.firstname}</p>
                    <p>Email: {patientDetails.email}</p>
                    {/* Display other patient details */}
                    <textarea
                        placeholder="Add note/message"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    ></textarea>
                    {/*<button onClick={}>Add Note</button>*/}
                    <button onClick={handleAddCondition}>Add Conditions</button>
                    {conditions.map((condition, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                value={condition}
                                onChange={(e) => handleConditionChange(index, e.target.value)}
                                placeholder={`Condition ${index + 1}`}
                            />

                        </div>
                    ))}
                    <div>
                        <h3>Messages</h3>
                        <h4>From Patients</h4>
                        {/* Display messages */}
                        <ul>
                            {messages.map((message, index) => (
                                <li key={index}>
                                    {/* Display message details */}
                                    <p>Content: {message.messageText}</p>
                                    {/* Display other message details */}
                                    <ul>
                                        {messagesReply
                                            .filter((reply) => reply.sender === message.receiver && reply.receiver === message.sender)
                                            .map((messagereply, replyIndex) => (
                                                <li key={replyIndex}>
                                                    <p>My Replys: {messagereply.messageText}</p>
                                                </li>
                                            ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
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
            <ul>
                <DrawingForm />
            </ul>
        </div>
    );
};

export default SelectedPatientPage;
