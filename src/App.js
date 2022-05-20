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
      console.log(response);
      if (response.statusText !== 'OK') {
        throw Error('Something went wrong...');
      }
      else {
        setPersons(response.data.results);
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      console.error('Error occurred: ' + e);
      setErrorMessage(e.message);
    }
  };

  useEffect(() => {
    fetchPersons();
  }, []);

  return (
    <>
      {errorMessage && <div>{errorMessage}</div>}
      {/* {persons.length === 0 ? 'Loading data...' : <Table persons={persons}/>} */}
      {isLoading && <div>Loading data...</div>}
      {persons && <Table persons={persons}/>}
    </>
  );
}

export default App;
