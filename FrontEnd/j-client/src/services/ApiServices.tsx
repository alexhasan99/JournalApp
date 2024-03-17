import {
    Encounter,
    LoginUser,
    Msg,
    Observation,
    User,
    ImageCreation,
    Patient,
    PatientForSearch
} from "../interface/interface";


const API_BASE_URL_auth = 'http://localhost:8080/api';
const API_BASE_URL = process.env.REACT_APP_API_URL;
const API_BASE_URL_image = process.env.REACT_APP_API_URL_IMAGE;
const API_BASE_URL_QUARKUS = process.env.REACT_APP_API_URL_QUARKUS;
const API_BASE_URL_message = process.env.REACT_APP_API_URL_MESSAGE;


const toke = sessionStorage.getItem('token');


const getHeaders = () => {
    const token = sessionStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };
};

const responseHandler = (response: Response) => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

const ApiService = {
    getPatients: async () => {
        return fetch(`${API_BASE_URL}/patients`, { headers: getHeaders() })
            .then(response => responseHandler(response));
    },
    getPatientById: async (id: number) => {
        return fetch(`${API_BASE_URL}/patients/${id}`, { headers: getHeaders() })
            .then(response => responseHandler(response));
    },
    getPatientByEmail: async (email: string) => {
        return fetch(`${API_BASE_URL}/patients/email/${email}`, { headers: getHeaders() })
            .then(response => responseHandler(response));
    },
    getPatientByUserId: async (userId: number) => {
        return fetch(`${API_BASE_URL}/patients/userId/${userId}`, { headers: getHeaders() })
            .then(response => responseHandler(response));
    },
    getAllStaff: async () => {
        return fetch(`${API_BASE_URL}/staffs`, { headers: getHeaders() })
            .then(response => responseHandler(response));
    },
    getStaffById: async (id: number) => {
        return fetch(`${API_BASE_URL}/staffs/${id}`, { headers: getHeaders() })
            .then(response => responseHandler(response));
    },
    getStaffByEmail: async (email: string) => {
        return fetch(`${API_BASE_URL}/staffs/email/${email}`, { headers: getHeaders() })
            .then(response => responseHandler(response));
    },
    getUserIdByPatientId: async (id: number) => {
        return fetch(`${API_BASE_URL}/patients/${id}/userId`, { headers: getHeaders() })
            .then(response => responseHandler(response));
    },
    getConversationBySenderAndReceiver: async (sender: number, receiver: number) => {
        return fetch(`${API_BASE_URL_message}/messages/conversation/${sender}/${receiver}`, { headers: getHeaders() })
            .then(response => responseHandler(response));
    },
    getMessages: async () => {
        return fetch(`${API_BASE_URL_message}/messages`, { headers: getHeaders() })
            .then(response => responseHandler(response));
    },
    getAllSentMessagesForUser: async (userId: number) => {
        return fetch(`${API_BASE_URL_message}/messages/sent/${userId}`, { headers: getHeaders() })
            .then(response => responseHandler(response));
    },
    getAllReceivedMessagesForUser: async (userId: number) => {
        return fetch(`${API_BASE_URL_message}/messages/rec/${userId}`, { headers: getHeaders() })
            .then(response => responseHandler(response));
    },
    getConversationById: async (otherUserId: number) => {
        return fetch(`${API_BASE_URL_message}/messages/conversation/${otherUserId}`, { headers: getHeaders() })
            .then(response => responseHandler(response));
    },
    getStaffInfo: async () => {
        return fetch(`${API_BASE_URL}/staffs`, { headers: getHeaders() })
            .then(response => responseHandler(response));
    },
    getEncounterByPatientId: async (patientId: number) => {
        return fetch(`${API_BASE_URL}/encounter/patients/${patientId}`, { headers: getHeaders() })
            .then(response => responseHandler(response));
    },
    getUsers: async () => {
        return fetch(`${API_BASE_URL_auth}/users`, { headers: getHeaders() })
            .then(response => responseHandler(response));
    },
    getAllEncountersByUserId: async (userId: number) => {
        return fetch(`${API_BASE_URL}/encounters/patient/${userId}`, { headers: getHeaders() })
            .then(response => responseHandler(response));
    },
    getAllEncounterIdsByUserId: async (userId: number) => {
        return fetch(`${API_BASE_URL}/encounter/patient/encounterId/${userId}`, { headers: getHeaders() })
            .then(response => responseHandler(response));
    },
    getObservationByEncounterId: async (encounterId: number) => {
        return fetch(`${API_BASE_URL}/observations/encounter/${encounterId}`, { headers: getHeaders() })
            .then(response => responseHandler(response));
    },
    getImageById: async (imageId: number) => {
        return fetch(`${API_BASE_URL_image}/images/${imageId}`, { headers: getHeaders() })
            .then(response => responseHandler(response));
    },
    getAllImages: async (patientId: number) => {
        return fetch(`${API_BASE_URL_image}/images/patient/${patientId}`, { headers: getHeaders() })
            .then(response => responseHandler(response));
    },
    createImage: async (image: ImageCreation) => {
        return fetch(`${API_BASE_URL_image}/images`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(image),
        }).then(response => responseHandler(response));
    },
    updateImageById: async (imageId: number, updatedDetails: ImageCreation) => {
        return fetch(`${API_BASE_URL_image}/images/${imageId}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(updatedDetails),
        })
        .then(response => responseHandler(response));
    },
    createEncounter: async (encounter: Encounter) => {
        return fetch(`${API_BASE_URL}/encounter`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(encounter),
        })
        .then(response => responseHandler(response));
    },
    createObservation: async (patientId: number, observation: Observation) => {
        try {
            const response = await fetch(`${API_BASE_URL}/patient/${patientId}/observation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${toke}`,
                },
                body: JSON.stringify(observation),
            });

            if (!response.ok) {
                throw new Error('Failed to add observation');
            }

            return true; // Indicate successful registration
        } catch (error) {
            console.error('Add Observation Error:', error);
            throw new Error('Failed to add observation'); // Throw error for failed registration
        }
    },
    addObservationToEncounter: async (encounterId: number, observation: Observation) => {
        return fetch(`${API_BASE_URL}/encounter/${encounterId}/observation`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(observation),
        })
        .then(response => responseHandler(response));
    },
    registerUser: async (user: User) => {
        try {
            const response = await fetch(`${API_BASE_URL_auth}/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            return true; // Indicate successful registration
        } catch (error) {
            console.error('Registration Error:', error);
            throw new Error('Registration failed'); // Throw error for failed registration
        }
    },
    loginUser: async (user: LoginUser) => {
        return fetch(`${API_BASE_URL_auth}/users/login`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(user),
        })
        .then(response => responseHandler(response));
    },
    createMessage: async (message: Msg) => {
        return fetch(`${API_BASE_URL_message}/messages`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(message),
        })
        .then(response => responseHandler(response));
    },
    searchPatientsByName: async (name: string): Promise<PatientForSearch[]> => {
        try {
            const response = await fetch(`${API_BASE_URL_QUARKUS}/patients/search/${name}`);
            if (!response.ok) {
                throw new Error('Nätverksfel vid sökning av patienter efter namn');
            }
            const data = response.json()
            console.log(data)
            return data
        } catch (error) {
            console.error('Fel vid sökning av patienter efter namn:', error);
            throw new Error('Sökning av patienter efter namn misslyckades');
        }
    },
    searchPatientsByGender: async (gender: string): Promise<PatientForSearch[]> => {
        try {
            const response = await fetch(`${API_BASE_URL_QUARKUS}/patients/searchByGender/${gender}`);
            if (!response.ok) {
                throw new Error('Nätverksfel vid sökning av patienter efter kön');
            }
            const data = response.json()
            console.log(data)
            return data
        } catch (error) {
            console.error('Fel vid sökning av patienter efter kön:', error);
            throw new Error('Sökning av patienter efter kön misslyckades');
        }
    },
    searchPatientsByCondition: async (condition: string): Promise<PatientForSearch[]> => {
        try {
            const response = await fetch(`${API_BASE_URL_QUARKUS}/patients/searchByCondition/${condition}`);
            if (!response.ok) {
                throw new Error('Nätverksfel vid sökning av patienter efter tillstånd');
            }
            const data =  response.json(); // Använd await för att vänta på att Promise ska lösa sig
            console.log(data); // Logga datan för att se till att den har hämtats korrekt
            return data;
        } catch (error) {
            console.error('Fel vid sökning av patienter efter tillstånd:', error);
            throw new Error('Sökning av patienter efter tillstånd misslyckades');
        }
    }
};

export default ApiService;
