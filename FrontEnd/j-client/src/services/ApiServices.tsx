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



const API_BASE_URL = 'http://localhost:8080/api'; // Byt ut med din backend URL
const API_BASE_URL_QUARKUS = 'http://localhost:8083';
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
    getPatients: () => {
        return fetch(`${API_BASE_URL}/patients`, { headers: getHeaders() })
        .then(response => responseHandler(response));
    },
    getPatientById: (id: number) => {
        return fetch(`${API_BASE_URL}/patients/${id}`, { headers: getHeaders() })
        .then(response => responseHandler(response));
    },
    getPatientByEmail: (email: string) => {
        return fetch(`${API_BASE_URL}/patients/email/${email}`, { headers: getHeaders() })
        .then(response => responseHandler(response));
    },
    getPatientByUserId: (userId: number) => {
        return fetch(`${API_BASE_URL}/patients/userId/${userId}`, { headers: getHeaders() })
            .then(response => responseHandler(response));
    },
    getAllStaff: () => {
        return fetch(`${API_BASE_URL}/staffs`, { headers: getHeaders() })
            .then(response => responseHandler(response));
    },
    getStaffById: (id: number) => {
        return fetch(`${API_BASE_URL}/staffs/${id}`, { headers: getHeaders() })
            .then(response => responseHandler(response));
    },

    getStaffByEmail: (email: string) => {
        return fetch(`${API_BASE_URL}/staffs/email/${email}`, { headers: getHeaders() })
            .then(response => responseHandler(response));
    },
    getUserIdByPatientId: (id: number) => {
        return fetch(`${API_BASE_URL}/patients/${id}/userId`, { headers: getHeaders() })
            .then(response => responseHandler(response));
    },
    getConversationBySenderAndReceiver: (sender: number, receiver: number) => {
        return fetch(`${API_BASE_URL}/massages/conversation/${sender}/${receiver}`, { headers: getHeaders() })
        .then(response => responseHandler(response));
    },
    getMessages: () => {
        return fetch(`${API_BASE_URL}/massages`, { headers: getHeaders() })
            .then(response => responseHandler(response));
    },
    getAllSentMessagesForUser: (userId: number) => {
        return fetch(`${API_BASE_URL}/massages/sent/${userId}`, { headers: getHeaders() })
            .then(response => responseHandler(response));
    },
    getAllReceivedMessagesForUser: (userId: number) => {
        return fetch(`${API_BASE_URL}/massages/rec/${userId}`, { headers: getHeaders() })
            .then(response => responseHandler(response));
    },
    getConversationById: (otherUserId: number) => {
        return fetch(`${API_BASE_URL}/msgs/conversation/${otherUserId}`, { headers: getHeaders() })
            .then(response => responseHandler(response));
    },
    getStaffInfo: () => {
        return fetch(`${API_BASE_URL}/staffs`, { headers: getHeaders() })
            .then(response => responseHandler(response));
    },
    getEncounterByPatientId: (patientId: number) => {
        return fetch(`${API_BASE_URL}/encounter/patients/${patientId}`, { headers: getHeaders() })
            .then(response => responseHandler(response));
    },
    getUsers: () => {
        return fetch(`${API_BASE_URL}/users`, { headers: getHeaders() })
            .then(response => responseHandler(response));
    },
    getAllEncountersByUserId: (userId: number) => {
        return fetch(`${API_BASE_URL}/encounters/patient/${userId}`, { headers: getHeaders() })
            .then(response => responseHandler(response));
    },
    getAllEncounterIdsByUserId: (userId: number) => {
        return fetch(`${API_BASE_URL}/encounter/patient/encounterId/${userId}`, { headers: getHeaders() })
            .then(response => responseHandler(response));
    },
    getObservationByEncounterId: (encounterId: number) => {
        return fetch(`${API_BASE_URL}/observations/encounter/${encounterId}`, { headers: getHeaders() })
            .then(response => responseHandler(response));
    },
    getImageById: (imageId: number) => {
        return fetch(`${API_BASE_URL}/images/${imageId}`, { headers: getHeaders() })
            .then(response => responseHandler(response));
    },
    getAllImages: (patientId: number) => {
        return fetch(`${API_BASE_URL}/images/patient/${patientId}`, { headers: getHeaders() })
            .then(response => responseHandler(response));
    },
    createImage: async (image: ImageCreation) => {
        return fetch(`${API_BASE_URL}/images`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(image),
        }).then(response => responseHandler(response));
    },
    updateImageById: async (imageId: number, updatedDetails: ImageCreation) => {
        return fetch(`${API_BASE_URL}/images/${imageId}`, {
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
            const response = await fetch(`${API_BASE_URL}/create`, {
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
        return fetch(`${API_BASE_URL}/users/login`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(user),
        })
        .then(response => responseHandler(response));
    },
    createMessage: async (message: Msg) => {
        return fetch(`${API_BASE_URL}/messages`, {
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
