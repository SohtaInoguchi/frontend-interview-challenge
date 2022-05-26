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
    const [title, setTitle] = useState(selectedPerson.title);
    const [birthday, setBirthday] = useState(selectedPerson.birthday);
    const [favoriteColor, setFavoriteColor] = useState(selectedPerson.favoriteColor);
    const [comment, setComment] = useState(selectedPerson.comment);
    
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

    const updatePersonInfo = async (e) => {
        try {
            e.preventDefault();
            setIsLoading(true);
            await delay(2000);
            const response = await axios.patch(`http://localhost:3000/persons/${selectedPerson.id}`, {
                    firstName: firstName,
                    lastName: lastName,
                    birthday: birthday,
                    comment: comment
            });
            const updatedPerson = response.data;
            const updatedPersons = persons.map(person => {
                if (person.id === updatedPerson.id) {
                    return updatedPerson;
                }
                return person;
            })
            setPersons(updatedPersons);
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
            setIsLoading(true);
            await delay(2000);
            const responseDelete = await axios.delete(`http://localhost:3000/persons/${selectedPerson.id}`);
            fetchPersons(setPersons, setErrorMessage, setIsLoading);
            setIsSelected(false);
        } catch (err) {
            setIsLoading(false);
            setErrorMessage(err.message);
            console.error(`Error occurred: ${err.message}`);
        }
    }

    const handleCancelClick = e => {
        e.preventDefault();
        setIsSelected(false);
    }

    const calculateAge = () => {
        return new Date().getFullYear() - new Date(selectedPerson.birthday).getFullYear();
    }

    const renderComment = (attributeObj) => {
        return (
            <textarea 
            id={attributeObj.label} 
            name={attributeObj.label}
            rows='5' cols='30'>
                {selectedPerson.comment}
            </textarea>
        )
    }

    const renderAddressInfo = (attributeObj) => {
        return (
            Object.keys(selectedPerson.address).map((addressInfo, index) => {
                const label = addressInfo === 'country' ? 
                "Country" : addressInfo === 'streetName' ? 
                'Street Name' : addressInfo === 'postalCode' ? 
                'Postal Code' : 'City';
                return (
                    <>
                    {index === 0 && <div>Address</div>}
                        <div className='input-fields'>
                            {/* <label key={index} for={attributeObj.label}>{`${addressInfo}: `}</label> */}
                            <label key={index} for={label}>{`${label}: `}</label>
                            <input type='text' value={selectedPerson.address[addressInfo]}/>
                        </div>
                    </>
                )
            })
        )
    }

    const renderPersonInfo = (attributeObj, value) => {
        return (
            <input 
            type={attributeObj.inputType} 
            value={value} 
            onChange={e => attributeObj.changeHandler(e.target.value)}/>
        )
    }
    
  return (
    <>
        <section className='modal' style={{backgroundColor: selectedPerson.favoriteColor}}>
            {isLoading && 
            <div className='indication'>Updating data...</div>}
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
            <form className='modal-form'>
                {
                    Object.keys(selectedPerson).map((property, index) => {
                        const attributeObj = switchAttribute(
                                            property, 
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
                        const inputValue = property === 'id' ? id : 
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
                                renderAddressInfo(attributeObj)
                                :
                                <div className='input-fields'>
                                <label key={index} for={attributeObj.label}>{`${attributeObj.label}: `}</label>
                                {property === 'comment' ? 
                                renderComment(attributeObj)
                                :   
                                renderPersonInfo(attributeObj, inputValue)                             
                                }
                                {property === 'birthday' && 
                                <div>{`${calculateAge()} years old`}</div>}
                                </div>
                                }
                            </>
                        )
                    })
                }
                <div className='modal-buttons'>
                    <button onClick={deletePerson} className='buttons' id='delete-button'>Delete</button>
                    <button onClick={updatePersonInfo} className='buttons'>Update</button>
                    <button onClick={handleCancelClick} className='buttons'>Cancel</button>
                </div>
            </form>
      </section>
    </>
  )
}
