import React from 'react'

export default function DetailModal(props) {
    const { selectedPerson } = props;

    const check = () => {
        // for (const key in selectedPerson) {
        //     if (selectedPerson.hasOwnProperty(key)) {
                
        //     }
        // }
        // console.log(keys);
    }

  return (
      <>
        <h1>DetailModal</h1>
            <ul id='person-details' >
                <li>Title: {selectedPerson.title}</li>
                <li>First Name: {selectedPerson.firstName}</li>
                <li>Last Name: {selectedPerson.lastName}</li>
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
                <li>Commnet: {selectedPerson.comment}</li>
            </ul>
        <button onClick={check}>check</button>
      </>
  )
}
