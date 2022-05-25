import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { fetchPersons, delay, switchAttribute } from '../helper/helper';
import { PersonsContext } from '../App';

export default function DetailModal(props) {
    const { selectedPerson, setIsSelected} = props;
    const { persons, setPersons } = useContext(PersonsContext);

    const [id, setId] = useState(selectedPerson.id);
    const [firstName, setFirstName] = useState(selectedPerson.firstName);
    const [lastName, setLastName] = useState(selectedPerson.lastName);
    const [favoriteBooks, setFavoriteBooks] = useState(selectedPerson.favoriteBooks);
    const [email, setEmail] = useState(selectedPerson.email);
    const [gender, setGender] = useState(selectedPerson.gender);
    const [country, setCountry] = useState(selectedPerson.address.country);
    const [streetName, setStreetName] = useState(selectedPerson.address.streetName);
    const [city, setCity] = useState(selectedPerson.address.city);
    const [title, setTitle] = useState(selectedPerson.title);
    const [birthday, setBirthday] = useState(selectedPerson.birthday);
    const [favoriteColor, setFavoriteColor] = useState(selectedPerson.favoriteColor);
    const [comment, setComment] = useState(selectedPerson.comment);
    
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState(selectedPerson.favoriteColor);

    const updatePersonInfo = async (e) => {
        try {
            e.preventDefault();
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
            setIsLoading(false);
            setErrorMessage(err.message);
        }
    }

    const deletePerson = async (e) => {
        try {
            e.preventDefault();
            const responseDelete = await axios.delete(`http://localhost:3000/persons/${selectedPerson.id}`);
            const responsePersons = await axios.get('http://localhost:3000/persons');
            fetchPersons(setPersons, setErrorMessage, setIsLoading);
            setIsSelected(false);
        } catch (err) {
            console.error(`Error occurred: ${err.message}`);
        }
    }

    const handleCancelClick = e => {
        e.preventDefault();
        setIsSelected(false);
    }
    
  return (
    <>
        <section className='modal' style={{backgroundColor: backgroundColor}}>
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
            {
                Object.keys(selectedPerson).map((property, index) => {
                    const attributeObj = switchAttribute(property, 
                                        setId, 
                                        setFirstName, 
                                        setLastName,
                                        setFavoriteBooks,
                                        setEmail,
                                        setGender,
                                        setTitle,
                                        setBirthday,
                                        setFavoriteColor,
                                        setComment);
                    const value = property === 'id' ? id : 
                                  property === 'firstName' ? firstName :
                                  property === 'lastName' ? lastName : 
                                  property === 'favoriteBooks' ? favoriteBooks : 
                                  property === 'email' ? email : 
                                  property === 'gender' ? gender : 
                                  property === 'title' ? title : 
                                  property === 'favoriteColor' ? favoriteColor : 
                                  property === 'birthday' ? birthday : 
                                  property === 'comment' ? comment : 
                                  'No info';
                    return (
                        <>
                            {property === 'address' ? 
                            Object.keys(selectedPerson.address).map((addressInfo, index) => {
                                return (
                                    <li key={index}>{`${addressInfo}: `}
                                    <input type='text' value={selectedPerson.address[addressInfo]} 
                                    // onChange={e => changeHandler(e.target.value)}
                                    />
                                    </li>    
                                )
                            })
                            :
                            <li key={index}>{`${attributeObj.label}: `}
                            <input 
                            type={attributeObj.inputType} 
                            value={value} 
                            onChange={e => attributeObj.changeHandler(e.target.value)}/>
                            </li>
                            }
                        </>
                    )
                })
            }
        </ul>
        <button onClick={updatePersonInfo}>Update</button>
        <button onClick={deletePerson}>Delete</button>
        <button onClick={handleCancelClick}>Cancel</button>
      </section>
    </>
  )
}
