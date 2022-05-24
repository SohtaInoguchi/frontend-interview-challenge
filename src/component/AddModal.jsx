import React, { useState, useContext } from 'react';
import axios from 'axios';
import { fetchPersons, isInputValid, isEmailValid, delay, randomIdGenerator } from '../helper/helper';
import { keyboard } from '@testing-library/user-event/dist/keyboard';
import { PersonsContext } from '../App';

export default function AddModal(props) {
    const { setAddClicked, setIsAddedSuccess} = props;
    const { persons, setPersons } = useContext(PersonsContext);
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
    const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

    const handleOnChangeBooks = (book, index) => {
        const tempArr = favoriteBooks;
        tempArr[index] = book;
        setFavoriteBooks([...tempArr]);
    }
    
    const addAnotherInput = () => {
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
            if (isInputValid(
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
                && 
                isEmailValid(email)
                ) {
                    console.log("valid input");
                    newPerson.id = randomIdGenerator();
                    newPerson.title = title;
                    newPerson.firstName = firstName;
                    newPerson.lastName = lastName;
                    newPerson.email = email
                    newPerson.birthday = birthday;
                    newPerson.gender = gender;  
                    newPerson.address = {country: country,
                                        city: city,
                                        streetName: streetName,
                                        postalCode: postalCode
                                        }
                    newPerson.favoriteColor = favoriteColor;
                    newPerson.favoriteBooks = favoriteBooks;
                    console.log(newPerson);
                }
                else {
                    alert("Please fill all the field besides Comment");
                    console.log("input invalid");
                    setIsLoading(false);
                    return;
                }
                const response = await axios.post(`http://localhost:3000/persons`, newPerson);
                const responsePersons = await axios.get('http://localhost:3000/persons');
                await delay(2000);
                if (response.statusText !== 'OK' || responsePersons.statusText !== 'OK') {
                    console.log("in error if");
                    throw Error('Something wend wrong...');
                }
                fetchPersons(setPersons, setErrorMessage, setIsLoading);
                setIsLoading(false);
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
      {isLoading && <div className='indication'>Updating data...</div>}

        {isUpdateSuccess && 
        <section className='indication'>
            <h3>Update success</h3>
            <button onClick={() => setAddClicked(false)}>close</button>
        </section>}

        {errorMessage && 
        <section className='indication'>
            <div>{errorMessage}</div>
            <button onClick={() => setAddClicked(false)}>close</button>
        </section>} 
    
        <div>
            <label for='title'>Title: </label>
            <input 
            type='text' 
            value={title} 
            name='title' 
            id='title' 
            onChange={(e) =>setTitle(e.target.value)} 
            required/>
        </div>
        <div>
            <label for='firstName'>First Name: </label>
            <input 
            type='text' 
            value={firstName} 
            name='firstName' 
            id='firstName' 
            onChange={(e) => setFirstName(e.target.value)} 
            required/>
        </div>
            <label for='lastName'>Last Name: </label>
            <input 
            type='text' 
            value={lastName} 
            name='lastName' 
            id='lastName' 
            onChange={(e) => setLastName(e.target.value)} 
            required/>
        <div>
            <label for='email'>email: </label>
            <input 
            type='email' 
            value={email} 
            name='email' 
            id='email' 
            onChange={(e) => setEmail(e.target.value)} 
            required/>
        </div>
        <div>
            <label for='gender'>Gender: </label>
            <select name='gender' id='gender-input' onChange={(e) => setGender(e.target.value)}>
                <option value=''>Please select your gender</option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
                <option value='Genderfluid'>Genderfluid</option>
            </select>
        </div>
            <label for='country'>Country: </label>
            <input 
            type='text' 
            value={country} 
            name='country' 
            id='country' 
            onChange={(e) => setCountry(e.target.value)} 
            required/>
        <div>
            <label for='streetName'>Street Name: </label>
            <input 
            type='text' 
            value={streetName} 
            name='streetName' 
            id='streetName' 
            onChange={(e) => setStreetName(e.target.value)} 
            required/>
        </div>
        <div>
            <label for='city'>City: </label>
            <input 
            type='text' 
            value={city} 
            name='city' 
            id='city' 
            onChange={(e) => setCity(e.target.value)} 
            required/>
        </div>

        <div>
            <label for='postalCode'>Postal code: </label>
            <input 
            type='text' 
            value={postalCode} 
            name='postalCode' 
            id='postalCode' 
            onChange={(e) => setPostalCode(e.target.value)} 
            required/>
        </div>

        <div>
            <label for='favoriteBooks'>Favorite books: </label>
            {
                favoriteBooks.map((book, index) => {
                    return <input 
                            type='text' 
                            value={favoriteBooks[index]} 
                            onChange={(e) => handleOnChangeBooks(e.target.value, index)}
                            />
                })
            }
            <button onClick={addAnotherInput}>Add another book</button>            
        </div>

        <div>
            <label for='birthday'>Birthday: </label>
            <input 
            type='date' 
            value={birthday} 
            name='birthday' 
            id='birthday' 
            onChange={(e) => setBirthday(e.target.value)} 
            required/>
        </div>

        <div>
            <label for='favoriteColor'>Favorite Color: </label>
            <input 
            type='color' 
            value={favoriteColor} 
            name='favoriteColor' 
            id='favoriteColor' 
            onChange={(e) => setFavoriteColor(e.target.value)} 
            required/>
        </div>

        <div>
            <label for='comment'>Comment: </label>
            <input 
            type='text' 
            value={comment} 
            id='comment'
            name='comment' 
            onChange={(e) => setComment(e.target.value)} 
            />

        </div>
        <button onClick={handleSubmit}>Add</button>
        <button onClick={handleCancelClick}>Cancel</button>
      </section>
      </>
  )
}
