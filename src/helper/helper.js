import axios from "axios";

export const fetchPersons = async (setPersons, setErrorMessage, setIsLoading) => {
    try {
      let page = 1;
      let response = await axios.get(`http://localhost:3000/persons?page=${page}`);
      let personsArr = response.data.results;
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

  export const isInputValid = (title, firstName, lastName, birthday, gender, country, streetName, city, postalCode, favoriteColor, favoriteBooks) => {
    if (title.length > 1 && firstName && lastName && birthday && gender && country && streetName && city && postalCode && favoriteColor && favoriteBooks[favoriteBooks.length - 1]) {
      return true;
    }
    return false;
  }

  export const isEmailValid = (email) => {
    const mailFormat = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/
    console.log(email.match(mailFormat));
    if (email.match(mailFormat)) {
      return true;
    }
    return false;
  }

  export const delay= ms => new Promise(resolve => setTimeout(resolve, ms));
