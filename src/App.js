import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState, useEffect, createContext, useMemo } from 'react';
import Table from './component/Table';
import { fetchPersons } from './helper/helper';
import { IoMdAddCircle } from 'react-icons/io';

export const PersonsContext = createContext(null);

function App() {
  const [persons, setPersons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const personsContext = useMemo(() => ({
    persons,
    setPersons
  }), [persons, setPersons]);

  useEffect(() => {
    fetchPersons(setPersons, setErrorMessage, setIsLoading);
  }, []);

  return (
    <div className='wrapper'>
      {errorMessage && <div className='initial-indication'>{errorMessage}</div>}
      {isLoading && <div className='initial-indication'>Loading data...</div>}
      {!isLoading && 
      // <>
      <PersonsContext.Provider value={personsContext}>
        {/* <Table persons={persons} setPersons={setPersons}/>  */}
        <Table /> 
      </PersonsContext.Provider>
      // </>
      }
    </div>
  );
}

export default App;
