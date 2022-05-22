import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Table from './component/Table';
import { fetchPersons } from './helper/helper';


// export const fetchPersons = async (setPersons, setErrorMessage, setIsLoading) => {
//   try {
//     let page = 1;
//     let response = await axios.get(`http://localhost:3000/persons?page=${page}`);
//     let personsArr = response.data.results;
//     console.log(response);
//     if (response.statusText !== 'OK') {
//       throw Error('Something went wrong...');
//     }
//     else {
//       while (response.data.hasNextPage) {
//         page++;
//         response = await axios.get(`http://localhost:3000/persons?page=${page}`);
//         if (response.statusText !== 'OK') {
//           throw Error('Something went wrong...');
//         }
//         personsArr = personsArr.concat(response.data.results);
//         console.log("persons arr", personsArr);
//       }
//       setPersons(personsArr);
//     }
//     setIsLoading(false);
//   } catch (err) {
//     setIsLoading(false);
//     console.error(`Error occurred: ${err}`);
//     setErrorMessage(err.message);
//   }
// };


function App() {
  const [persons, setPersons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchPersons(setPersons, setErrorMessage, setIsLoading);
  }, []);

  return (
    <div className='wrapper'>
      {errorMessage && <div className='initial-indication'>{errorMessage}</div>}
      {isLoading && <div className='initial-indication'>Loading data...</div>}
      {/* {persons && <Table persons={persons} setPersons={setPersons}/>} */}
      {!isLoading && <Table persons={persons} setPersons={setPersons}/>}
    </div>
  );
}

export default App;
