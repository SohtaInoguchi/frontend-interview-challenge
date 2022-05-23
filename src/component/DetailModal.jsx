import React, { useState } from 'react';
import axios from 'axios';
import { fetchPersons, delay } from '../helper/helper';

export default function DetailModal(props) {
    const { selectedPerson, persons, setPersons, setIsSelected} = props;
    const [title, setTitle] = useState(selectedPerson.title);
    const [firstName, setFirstName] = useState(selectedPerson.firstName);
    const [lastName, setLastName] = useState(selectedPerson.lastName);
    const [birthday, setBirthday] = useState(selectedPerson.birthday);
    const [comment, setComment] = useState(selectedPerson.comment);
    // const [isUpdating, setIsUpdating] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

    const updatePersonInfo = async (e) => {
        try {
            e.preventDefault();
            // setIsUpdating(true);
            setIsLoading(true);
            const response = await axios.patch(`http://localhost:3000/persons/${selectedPerson.id}`, {
                    firstName: firstName,
                    lastName: lastName,
                    birthday: birthday,
                    comment: comment
                });
            await delay(2000);
                if (response.statusText !== 'OK') {
                    throw Error('Something went wrong...');
                }
            const updatedPerson = response.data;
            const updatedPersons = persons.map(person => {
                if (person.id === updatedPerson.id) {
                    return updatedPerson;
                }
                else {
                    return person;
                }
            })
            setPersons(updatedPersons);
            setIsLoading(false);
            setIsUpdateSuccess(true);
        } catch (err) {
            console.error(`Error occurred: ${err}`);
            // setIsUpdating(false);
            setIsLoading(false);
            setErrorMessage(err.message);
        }
    }

    const deletePerson = async (e) => {
        try {
            e.preventDefault();
            const responseDelete = await axios.delete(`http://localhost:3000/persons/${selectedPerson.id}`);
            const responsePersons = await axios.get('http://localhost:3000/persons');
            // setPersons([...responsePersons.data.results]);
            fetchPersons(setPersons, setErrorMessage, setIsLoading);
            setIsSelected(false);
        } catch (err) {
            console.error(`Error occurred: ${err.message}`);
        }
    }

  return (
    <>
    {/* {isUpdating && <section>Updating data...</section>} */}
      <section className='modal'>
      {/* {isUpdating && <div className='indication'>Updating data...</div>} */}
      {isLoading && <div className='indication'>Updating data...</div>}
    {isUpdateSuccess && 
    <section className='indication'>
        <h3>Update success</h3>
        <button onClick={() => setIsSelected(false)}>close</button>
    </section>}
    {errorMessage && 
    <section className='indication'>
        <div>{errorMessage}</div>
        <button onClick={() => setIsSelected(false)}>close</button>
    </section>}
        <ul>
            <li>Title: <input type='text' value={title} onChange={e => setTitle(e.target.value)}/></li>
            <li>First Name: <input type='text' value={firstName} onChange={e => setFirstName(e.target.value)}/></li>
            <li>Last Name: <input type='text' value={lastName} onChange={e => setLastName(e.target.value)}/></li>
            <li>Birthday: <input type='text' value={birthday} onChange={e => setBirthday(e.target.value)}/></li>
            <li>Email: {selectedPerson.email}</li>
            <li>Gender: {selectedPerson.gender}</li>
            <li>Address: 
                <ul>
                    <li>Country: {selectedPerson.address.country}</li>
                    <li>streetName: {selectedPerson.address.streetName}</li>
                    <li>City: {selectedPerson.address.city}</li>
                </ul>
            </li>
            <li>Favorite Books: {selectedPerson.favoriteBooks}</li>
            <li>Comment: <textarea type='text' cols='50' rows='min-content' onChange={e => setComment(e.target.value)} value={comment}/></li>
        </ul>
        <button onClick={updatePersonInfo}>Update</button>
        <button onClick={deletePerson}>Delete</button>
      </section>
    </>
  )
}
