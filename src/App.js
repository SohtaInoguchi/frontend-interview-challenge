import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

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
      <h1>Hello world</h1>
    </>
  );
}

export default App;
