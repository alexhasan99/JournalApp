import React, { useState, useEffect } from 'react';
import { PatientForSearch } from '../interface/interface';
import ApiService from '../services/ApiServices';

interface PatientSearchFormProps {
    onSearchComplete: (patients: PatientForSearch[]) => void;
}

const PatientSearchForm: React.FC<PatientSearchFormProps> = ({ onSearchComplete }) => {
    const [searchCriteria, setSearchCriteria] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSearch = async () => {
        try {
            let patients: PatientForSearch[] = [];
            if (searchCriteria === 'Name') {
                patients = await ApiService.searchPatientsByName(searchValue);
            } else if (searchCriteria === 'Gender') {
                // Validera att angivet kön är antingen "Male" eller "Female"
                if (searchValue.toLowerCase() !== 'male' && searchValue.toLowerCase() !== 'female') {
                    setErrorMessage('Please enter "Male" or "Female"');
                    return;
                }
                patients = await ApiService.searchPatientsByGender(searchValue);
            } else if (searchCriteria === 'Condition') {
                patients = await ApiService.searchPatientsByCondition(searchValue);
            }
            onSearchComplete(patients);
            setErrorMessage(''); // Återställ felmeddelandet när sökningen lyckas
        } catch (error) {
            console.error('Error searching patients:', error);
        }
    };

    // Återställ felmeddelandet när användaren ändrar sökkriteriet eller sökvärdet
    useEffect(() => {
        setErrorMessage('');
    }, [searchCriteria, searchValue]);

    return (
        <div>
            <label>
                Search by:
                <select value={searchCriteria} onChange={(e) => setSearchCriteria(e.target.value)}>
                    <option value="">Select Criteria</option>
                    <option value="Name">Name</option>
                    <option value="Gender">Gender</option>
                    <option value="Condition">Condition</option>
                </select>
            </label>
            <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
};

export default PatientSearchForm;
