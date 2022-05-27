import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import DetailModal from './DetailModal';
import { delay } from '../helper/helper';
import { IoMdAddCircle } from 'react-icons/io';
import AddModal from './AddModal';
import { PersonsContext } from '../App';

export default function Table(props) {
    const { persons } = useContext(PersonsContext);
    const headerNames = ['ID', 'Title', 'Name', 'Email'];
    const [selectedPerson, setSelectedPerson] = useState({});
    const [isSelected, setIsSelected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isAddedSuccess, setIsAddedSuccess] = useState(false);
    const [isAddClicked, setAddClicked] = useState(false);

    const getDetails = async (e) => {
        try {
            e.preventDefault();
            setIsLoading(true);
            const selectedUserId = e.currentTarget.id;
            await delay(2000);
            const response = await axios.get(`http://localhost:3000/persons/${selectedUserId}`)
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
        {errorMessage && 
        <section className='indication'>
            <h3>{errorMessage}</h3>
            <button onClick={() => setErrorMessage('')}>close</button>
        </section>}

        {isLoading && <section className='indication'>Loading data...</section>}
        <table id='persons-table'>
            <thead>
                <tr>
                    {headerNames.map((headerName, i) => <th key={i} className="table-headers">{headerName}</th>)}
                </tr>
            </thead>
            <tbody className='table-body'>
                {persons.map(person => 
                <tr onClick={(e) => getDetails(e)} key={person.id} id={person.id} className='table-rows'>
                    <td className='table-data'>{person.id}</td>
                    <td className='table-data'>{person.title}</td>
                    <td className='table-data'>{`${person.firstName} ${person.lastName}`}</td>
                    <td className='table-data'>{person.email}</td>
                </tr>)}
            </tbody>
        </table>
        <IoMdAddCircle id='add-icon' onClick={() => setAddClicked(!isAddClicked)}/>

        {isAddedSuccess && 
        <section className='indication'>
            <h3>Update success</h3>
            <button onClick={() => setIsAddedSuccess(false)}>close</button>
        </section>}

        {isAddClicked && 
        <AddModal
            selectedPerson={selectedPerson} 
            setAddClicked={setAddClicked}
            setIsAddedSuccess={setIsAddedSuccess}
            isLoading={isLoading}    
        />}
        {!isLoading && isSelected &&
        <DetailModal 
            selectedPerson={selectedPerson} 
            setIsSelected={setIsSelected}
            isLoading={isLoading}
        />}
    </>
  )
}
