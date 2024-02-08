export interface User{
    id: number;
    role: string;
    email: string;
    password: string;
}

export interface LoginUser {

    email: string;
    password: string;
}

export interface  LoggedInUser {
    userId: number| undefined;
    userType: string;
    email: string;
}

export interface Encounter {

    userId: number;
    timeStamp: string;

}

export interface EncounterForDisplay {
    id: number;
    patientId: number;
    staffId: number;
    encounterDate: string;
    location: string;
    observations: Observation[];
}

export interface Observation {
    observationText: string;
    observationDate: string;
    type: string;

}

export interface Patient {
    id: number;
    firstname: string;
    lastname: string;
    gender: string;
    email: string;
    user: User
}

export interface PatientForPage {
    id: number;
}

export interface PatientDetails {
    id: number;
    firstname: string;
    lastname: string;
    gender: string;
    email: string;
    user: User
}

export interface Msg {
    messageText: string;
    timeStamp: string;
    sender: number;
    receiver: number;
}

export interface Doctor {
    userId: number;
    name: string;
    email: string;
}

export interface Others {
    userId: number;
    name: string;
    email: string;
}

export interface StaffMember {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    gender: string;
    staffType: string;
    user: User;
}