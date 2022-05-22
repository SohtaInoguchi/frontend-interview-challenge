import React, { useState } from 'react';
import axios from 'axios';

export default function DetailModal(props) {
    const { selectedPerson, persons, setPersons, setIsSelected, isSelected, isLoading} = props;
    const [title, setTitle] = useState(selectedPerson.title);
    const [firstName, setFirstName] = useState(selectedPerson.firstName);
    const [lastName, setLastName] = useState(selectedPerson.lastName);
    const [birthday, setBirthday] = useState(selectedPerson.birthday);
    const [comment, setComment] = useState(selectedPerson.comment);
    const [isUpdating, setIsUpdating] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

    const updatePersonInfo = async (e) => {
        try {
            e.preventDefault();
            setIsUpdating(true);
            const response = await axios.patch(`http://localhost:3000/persons/${selectedPerson.id}`, {
                    firstName: firstName,
                    lastName: lastName,
                    birthday: birthday,
                    comment: comment
                });
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
            setTimeout(() => {
                setIsUpdating(false);
                setIsSelected(false);
                setIsUpdateSuccess(true);
            }, 3000);
        } catch (err) {
            console.error(`Error occurred: ${err}`);
            setIsUpdating(false);
            setErrorMessage(err.message);
        }
    }

    const renderSuccess = () => {

        setTimeout(() => {
            setIsUpdateSuccess(false);
        }, 1000)

        return (
            <>
                <section>Successfuly updated</section>
            </>
        )
    }

  return (
    <>
    {isUpdating && <section>Updating data...</section>}
    {errorMessage && <section>{errorMessage}</section>}
    {isUpdateSuccess && <section>{renderSuccess()}</section>}
    {/* <section className={isSelected ? 'modal-show' : 'modal-hyde'}> */}
      <section className='modal-show'>
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
      </section>
    </>
  )
}
