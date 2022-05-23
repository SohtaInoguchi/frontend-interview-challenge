import React, { useState } from 'react';
import axios from 'axios';
import { fetchPersons } from '../helper/helper';

export default function AddModal(props) {
    // const { selectedPerson, persons, setPersons, setIsSelected} = props;
    const [title, setTitle] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState('');
    const [country, setCountry] = useState('');
    const [streetName, setStreetName] = useState('');
    const [city, setCity] = useState('');
    const [favoriteColor, setFavoriteColor] = useState('');
    const [favoriteBooks, setFavoriteBooks] = useState([]);
    const [comment, setComment] = useState('');
    // const [isUpdating, setIsUpdating] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

    const handleSubmit = async (e) => {
        // e.preventDefault();
        try {
        } catch (err) {
            console.error(`Error occurred: ${err}`);
        }
    }

  return (
      <>
      <section className='modal'>
      {/* {isLoading && <div className='indication'>Updating data...</div>}
    {isUpdateSuccess && 
    <section className='indication'>
        <h3>Update success</h3>
        <button onClick={() => setIsSelected(false)}>close</button>
    </section>}
    {errorMessage && 
    <section className='indication'>
        <div>{errorMessage}</div>
        <button onClick={() => setIsSelected(false)}>close</button>
    </section>} */}
    <form action='http://localhost:3000/persons' method='post' id='add-form'>
        <div>
            <label for='title'>Title: </label>
            <input type='text' value={title} name='title' id='title' required/>
        </div>
        <div>
            <label for='firstName'>First Name: </label>
            <input type='text' value={firstName} name='firstName' id='firstName' required/>
        </div>
            <label for='lastName'>Last Name: </label>
            <input type='text' value={lastName} name='lastName' id='lastName' required/>
        <div>
            <label for='email'>email: </label>
            <input type='email' value={email} name='email' id='email' required/>
        </div>
        <div>
            <label for='gender'>Gender: </label>
            <input type='text' value={gender} name='gender' id='gender' required/>
        </div>
            <label for='country'>Country: </label>
            <input type='text' value={country} name='country' id='country' required/>
        <div>
            <label for='streetName'>Street Name: </label>
            <input type='text' value={streetName} name='streetName' id='streetName' required/>
        </div>
        <div>
            <label for='city'>City: </label>
            <input type='text' value={city} name='city' id='city' required/>
        </div>

        <div>            
            <label for='favoriteBooks'>Favorite books: </label>
            <input type='text' value={favoriteBooks} name='favoriteBooks' id='favoriteBooks' required/>
        </div>

        <div>
            <label for='birthday'>Birthday: </label>
            <input type='date' value={birthday} name='birthday' id='birthday' required/>
        </div>

        <div>
            <label for='favoriteColor'>Favorite Color: </label>
            <input type='text' value={favoriteColor} name='favoriteColor' id='favoriteColor' required/>
        </div>

        <div>
            <label for='comment'>Comment: </label>
            <input type='text' value={comment} name='comment' id='comment'/>
        </div>
        <button onClick={handleSubmit}>Add</button>
    </form>
            {/* <li>First Name: <input type='text' value={firstName} onChange={e => setFirstName(e.target.value)}/></li>
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
            <li>Comment: <textarea type='text' cols='50' rows='min-content' onChange={e => setComment(e.target.value)} value={comment}/></li> */}
      </section>
      </>
  )
}
