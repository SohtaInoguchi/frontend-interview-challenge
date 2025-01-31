import logo from './logo.svg';
import './App.css';
import { useState, useEffect, createContext, useMemo } from 'react';
import Table from './component/Table';
import { fetchPersons } from './helper/helper';

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
      {errorMessage && <section className='initial-indication'>{errorMessage}</section>}
      {isLoading && <section className='initial-indication'>Loading data...</section>}
      {!isLoading && persons.length > 0 &&
      <PersonsContext.Provider value={personsContext}>
        <Table /> 
      </PersonsContext.Provider>
      }
    </div>
  );
}

export default App;
