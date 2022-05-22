import axios from "axios";

export const fetchPersons = async (setPersons, setErrorMessage, setIsLoading) => {
    try {
      let page = 1;
      let response = await axios.get(`http://localhost:3000/persons?page=${page}`);
      let personsArr = response.data.results;
      console.log(response);
      if (response.statusText !== 'OK') {
        throw Error('Something went wrong...');
      }
      else {
        while (response.data.hasNextPage) {
          page++;
          response = await axios.get(`http://localhost:3000/persons?page=${page}`);
          if (response.statusText !== 'OK') {
            throw Error('Something went wrong...');
          }
          personsArr = personsArr.concat(response.data.results);
          console.log("persons arr", personsArr);
        }
        setPersons(personsArr);
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.error(`Error occurred: ${err}`);
      setErrorMessage(err.message);
    }
  };