import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { fetchPersons, isformFilled, isEmailValid, delay, randomIdGenerator, switchAttribute } from '../helper/helper';
import { keyboard } from '@testing-library/user-event/dist/keyboard';
import { PersonsContext } from '../App';
import { setSelectionRange } from '@testing-library/user-event/dist/utils';

export default function AddModal(props) {
    const { setAddClicked, setIsAddedSuccess} = props;
    const { setPersons } = useContext(PersonsContext);
    const [title, setTitle] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState('');
    const [country, setCountry] = useState('');
    const [streetName, setStreetName] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [favoriteColor, setFavoriteColor] = useState('');
    const [favoriteBooks, setFavoriteBooks] = useState(['']);
    const [comment, setComment] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleOnChangeBooks = (book, index) => {
        const tempArr = favoriteBooks;
        tempArr[index] = book;
        setFavoriteBooks([...tempArr]);
    }
    
    const addAnotherInput = (e) => {
        e.preventDefault();
        const tempArr = favoriteBooks;
        tempArr.push('');
        setFavoriteBooks([...tempArr]);
    }

    const handleCancelClick = e => {
        e.preventDefault();
        setAddClicked(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const newPerson = {};
            if (!isformFilled(
                title,
                firstName, 
                lastName, 
                birthday, 
                gender, 
                country, 
                streetName, 
                city,
                postalCode,
                favoriteColor,
                favoriteBooks) 
                ) {
                    alert("Please fill all the field besides Comment");
                    setIsLoading(false);
                    return;
                }
                else if (!isEmailValid(email)) {
                    alert('Please enter valid email address');
                    setIsLoading(false);
                    return;        
                }
                else {
                    newPerson.id = randomIdGenerator();
                    newPerson.firstName = firstName;
                    newPerson.lastName = lastName;
                    newPerson.favoriteBooks = favoriteBooks.filter(book => book !== '');
                    newPerson.email = email
                    newPerson.gender = gender;  
                    newPerson.title = title;
                    newPerson.birthday = birthday;
                    newPerson.favoriteColor = favoriteColor;
                    newPerson.address = {country: country,
                                        city: city,
                                        streetName: streetName,
                                        postalCode: postalCode
                                        }
                    newPerson.comment = comment;
                }
            await delay(2000);
            const response = await axios.post(`http://localhost:3000/persons`, newPerson);
            fetchPersons(setPersons, setErrorMessage, setIsLoading);
            setIsAddedSuccess(true);
            setAddClicked(false);
        } catch (err) {
            console.error(`Error occurred: ${err}`);
            setIsLoading(false);
            setErrorMessage(err.message);
        }
    }

  return (
    <>
      <section className='modal'>
        {isLoading && 
        <section className='indication'>Updating data...</section>}

        {errorMessage && 
        <section className='indication'>
            <h3>{errorMessage}</h3>
            <button onClick={() => setAddClicked(false)}>close</button>
        </section>}
    
        <form className='modal-form'>
            <div className='input-fields'>
                <label htmlFor='title'>Title: </label>
                <input 
                type='text' 
                value={title} 
                name='title' 
                id='title' 
                onChange={(e) =>setTitle(e.target.value)} 
                required/>
            </div>
            <div className='input-fields'>
                <label htmlFor='firstName'>First Name: </label>
                <input 
                type='text' 
                value={firstName} 
                name='firstName' 
                id='firstName' 
                onChange={(e) => setFirstName(e.target.value)} 
                required/>
            </div>
            <div className='input-fields'>
                <label htmlFor='lastName'>Last Name: </label>
                <input 
                type='text' 
                value={lastName} 
                name='lastName' 
                id='lastName' 
                onChange={(e) => setLastName(e.target.value)} 
                required/>
            </div>
            <div className='input-fields'>
                <label htmlFor='email'>email: </label>
                <input 
                type='email' 
                value={email} 
                name='email' 
                id='email' 
                onChange={(e) => setEmail(e.target.value)} 
                required/>
            </div>
            <div className='input-fields'>
                <label htmlFor='gender'>Gender: </label>
                <select name='gender' id='gender-input' onChange={(e) => setGender(e.target.value)}>
                    <option value=''>Please select your gender</option>
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                    <option value='Genderfluid'>Genderfluid</option>
                </select>
            </div>
            <p>Address</p>
            <div className='input-fields'>
                <label htmlFor='country'>Country: </label>
                <input 
                type='text' 
                value={country} 
                name='country' 
                id='country' 
                onChange={(e) => setCountry(e.target.value)} 
                required/>
            </div>
            <div className='input-fields'>
                <label htmlFor='streetName'>Street Name: </label>
                <input 
                type='text' 
                value={streetName} 
                name='streetName' 
                id='streetName' 
                onChange={(e) => setStreetName(e.target.value)} 
                required/>
            </div>
            <div className='input-fields'>
                <label htmlFor='city'>City: </label>
                <input 
                type='text' 
                value={city} 
                name='city' 
                id='city' 
                onChange={(e) => setCity(e.target.value)} 
                required/>
            </div>
            <div className='input-fields'>
                <label htmlFor='postalCode'>Postal code: </label>
                <input 
                type='text' 
                value={postalCode} 
                name='postalCode' 
                id='postalCode' 
                onChange={(e) => setPostalCode(e.target.value)} 
                required/>
            </div>
            <div>
                <label htmlFor='favoriteBooks' className='input-fields-books'>Favorite books: </label>
                {
                favoriteBooks.map((book, index) => {
                        return <input
                                key={index} 
                                type='text' 
                                value={favoriteBooks[index]} 
                                onChange={(e) => handleOnChangeBooks(e.target.value, index)}
                                className='input-fields-books'
                                />
                    })
                }
                <button onClick={addAnotherInput}>Add another book</button>            
            </div>
            <div className='input-fields'>
                <label htmlFor='birthday'>Birthday: </label>
                <input 
                type='date' 
                value={birthday} 
                name='birthday' 
                id='birthday' 
                onChange={(e) => setBirthday(e.target.value)} 
                required/>
            </div>
            <div className='input-fields'>
                <label htmlFor='favoriteColor'>Favorite Color: </label>
                <input 
                type='color' 
                value={favoriteColor} 
                name='favoriteColor' 
                id='favoriteColor' 
                onChange={(e) => setFavoriteColor(e.target.value)} 
                required/>
            </div>
            <div className='input-fields'>
                <label htmlFor='comment'>Comment: </label>
                <textarea 
                type='text' 
                value={comment} 
                id='comment'
                name='comment' 
                onChange={(e) => setComment(e.target.value)}
                rows='5' cols='30'>
                    {comment}
                </textarea>
            </div>
            <div className='add-modal-buttons'>
                <button onClick={handleSubmit} className='buttons'>Add</button>
                <button onClick={handleCancelClick} className='buttons'>Cancel</button>
            </div>
        </form>
      </section>
    </>
  )
}
