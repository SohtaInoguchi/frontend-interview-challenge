import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Table from './component/Table';

function App() {
  const [persons, setPersons] = useState([]);

  const fetchPersons = async () => {
    try {
      const response = await axios.get('http://localhost:3000/persons');
      setPersons(response.data.results);      
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchPersons();
  }, []);

  return (
    <>
      {persons.length && <Table persons={persons}/>}
    </>
  );
}

export default App;
