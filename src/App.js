import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Table from './component/Table';
import { fetchPersons } from './helper/helper';
import { IoMdAddCircle } from 'react-icons/io';

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
      {!isLoading && 
      <>
      <Table persons={persons} setPersons={setPersons}/> 
      <IoMdAddCircle id='add-icon'/>
      </>}
    </div>
  );
}

export default App;
