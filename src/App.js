import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Table from './component/Table';

function App() {
  const [persons, setPersons] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchPersons = async () => {
    try {
      const response = await axios.get('http://localhost:3000/persons');
      if (response.statusText !== 'OK') {
        throw Error('Something went wrong...');
      }
      // else {
        setPersons(response.data.results);
        setIsLoading(false);
      // }
    } catch (err) {
      setIsLoading(false);
      console.error(`Error occurred: ${err}`);
      setErrorMessage(err.message);
    }
  };

  useEffect(() => {
    fetchPersons();
  }, []);

  return (
    <div className='wrapper'>
      {errorMessage && <div className='initial-indication'>{errorMessage}</div>}
      {isLoading && <div className='initial-indication'>Loading data...</div>}
      {persons && <Table persons={persons} setPersons={setPersons}/>}
    </div>
  );
}

export default App;
