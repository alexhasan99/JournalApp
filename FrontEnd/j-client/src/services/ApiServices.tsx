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
        try {
            // Make a PUT request to update the image details
            const response = await fetch(`${API_BASE_URL}/images/${imageId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedDetails),
            });

            if (!response.ok) {
                throw new Error('Failed to update image details');
            }

            // Return the updated image details
            return response.json();
        } catch (error) {
            console.error('Error updating image details:', error);
            throw error; // Rethrow the error to handle it in the component
        }
    },
    createEncounter: async (encounter: Encounter) => {
        try {
            const response = await fetch(`${API_BASE_URL}/encounter`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(encounter),
            });

            if (!response.ok) {
                throw new Error('Encounter failed at apiService');
            }


             // Parse response body as JSON
            return await response.json(); // Return the created encounter object
        } catch (error) {
            console.error('Encounter creation Error at Catch:', error);
            throw new Error('Encounter creation failed as throw in Catch:'); // Throw error for failed registration
        }
    },
    createObservation: async (patientId: number, observation: Observation) => {
        try {
            const response = await fetch(`${API_BASE_URL}/patient/${patientId}/observation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
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
        try {
            const response = await fetch(`${API_BASE_URL}/encounter/${encounterId}/observation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(observation),
            });

            if (!response.ok) {
                throw new Error('Failed to add observation to encounter, response not ok');
            }

            return response.json(); // Return response JSON data if needed
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to add observation to encounter, were caught');
        }
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
        try {
            // Hämta token från session storage
            const token = sessionStorage.getItem('token');
    
            // Kontrollera att token finns innan du fortsätter
            if (!token) {
                throw new Error('No token found');
            }

            console.log(token)
    
            const response = await fetch(`${API_BASE_URL}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Lägg till token i Authorization-header
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(user),
            });
    
            if (!response.ok) {
                throw new Error('LogIn failed');
            }
    
            return true; // Indicate successful login
        } catch (error) {
            console.error('LogIn Error:', error);
            throw new Error('LogIn failed'); // Throw error for failed login
        }
    },
    createMessage: async (message: Msg) => {
        try {
            const response = await fetch(`${API_BASE_URL}/massages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(message),
            });

            if (!response.ok) {
                throw new Error('Creating message failed');
            }

            return true; // Indicate successful registration
        } catch (error) {
            console.error('Message Error:', error);
            throw new Error('Message failed'); // Throw error for failed registration
        }
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
