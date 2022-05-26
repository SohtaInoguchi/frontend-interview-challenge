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
    if (title.length > 1 && firstName && lastName && birthday && gender && country && streetName && city && postalCode && favoriteColor && favoriteBooks[0]) {
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

  export const randomIdGenerator = () => {
    const randomNumber = Math.floor(Math.random() * 10000);
    console.log(randomNumber);
    const id = `6ad313a7d${randomNumber}`;
    return id;
  }

  export const switchAttribute = (property,
                                  setId,
                                  setFirstName,
                                  setLastName,
                                  setFavoriteBooks,
                                  setEmail,
                                  setGender,
                                  setTitle,
                                  setBirthday,
                                  setFavoriteColor,
                                  setComment) => {
    const attributeObj = {};
    if (property === 'id') {
        attributeObj.label = 'ID';
        attributeObj.inputType = 'text';
        attributeObj.changeHandler = setId;    
    }
    else if (property === 'firstName') {
        attributeObj.label = 'First Name';
        attributeObj.inputType = 'text';
        attributeObj.changeHandler = setFirstName;
    }
    else if (property === 'lastName') {
        attributeObj.label = 'Last Name';
        attributeObj.inputType = 'text';
        attributeObj.changeHandler = setLastName;    
    }
    else if (property === 'favoriteBooks') {
        attributeObj.label = 'Favorite books';
        attributeObj.inputType = 'text';
        attributeObj.changeHandler = setFavoriteBooks;
    }
    else if (property === 'email') {
        attributeObj.label = 'email';
        attributeObj.inputType = 'email';
        attributeObj.changeHandler = setEmail;    
    }
    else if (property === 'gender') {
        attributeObj.label = 'Gender';
        attributeObj.inputType = 'text';
        attributeObj.changeHandler = setGender;    
    }
    else if (property === 'title') {
        attributeObj.label = 'Title';
        attributeObj.inputType = 'text';
        attributeObj.changeHandler = setTitle;    
    }
    else if (property === 'birthday') {
        attributeObj.label = 'Birthday';
        attributeObj.inputType = 'date';
        attributeObj.changeHandler = setBirthday;    
    }
    else if (property === 'favoriteColor') {
        attributeObj.label = 'Favorite color';
        attributeObj.inputType = 'color';
        attributeObj.changeHandler = setFavoriteColor;    
    }
    else {
        attributeObj.label = 'Comment';
        attributeObj.inputType = 'text';
        attributeObj.changeHandler = setComment;    
    }
    return attributeObj;
  }