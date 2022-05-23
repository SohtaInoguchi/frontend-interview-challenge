import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DetailModal from './DetailModal';
import { delay } from '../helper/helper';
import { IoMdAddCircle } from 'react-icons/io';
import AddModal from './AddModal';

export default function Table(props) {
    const { persons, setPersons } = props;
    const headerNames = ['ID', 'Title', 'Name', 'Email'];
    const [selectedPerson, setSelectedPerson] = useState({});
    const [isSelected, setIsSelected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isAddClicked, setAddClicked] = useState(false);

    const getDetails = async (e) => {
        try {
            e.preventDefault();
            setIsLoading(true);
            const selectedUserId = e.currentTarget.id;
            const response = await axios.get(`http://localhost:3000/persons/${selectedUserId}`)
            await delay(2000);
            setSelectedPerson(response.data);
            setIsSelected(true);
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            setErrorMessage(err.message);
            console.error(`Error occurred: ${err}`);
        }
    }

  return (
    <>
    <table id='persons-table'>
        {errorMessage && <div className='indication'>{errorMessage}</div>}
        {isLoading && <div className='indication'>Loading data...</div>}
        <thead>
            <tr>
                {headerNames.map((headerName, i) => <th key={i}>{headerName}</th>)}
            </tr>
        </thead>
        <tbody>
            {persons.map(person => 
            <tr onClick={(e) => getDetails(e)} id={person.id} className='table-rows'>
                <td>{person.id}</td>
                <td>{person.title}</td>
                <td>{`${person.firstName} ${person.lastName}`}</td>
                <td>{person.email}</td>
            </tr>)}
        </tbody>
    </table>
    <IoMdAddCircle id='add-icon' onClick={() => setAddClicked(!isAddClicked)}/>
    {isAddClicked && 
    <AddModal
        selectedPerson={selectedPerson} 
        persons={persons} 
        setPersons={setPersons}
        setIsSelected={setIsSelected}
        isSelected={isSelected}
        isLoading={isLoading}    
    />}
    {!isLoading && isSelected &&
    <DetailModal 
        selectedPerson={selectedPerson} 
        persons={persons} 
        setPersons={setPersons}
        setIsSelected={setIsSelected}
        isSelected={isSelected}
        isLoading={isLoading}
        />}
    </>
  )
}
