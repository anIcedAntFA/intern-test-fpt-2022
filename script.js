const $ = document.querySelector.bind(document);
const form = $('[app-form]');
const input = $('[form-control]');
const btn = $('[app-btn]');
const result = $('[app-result]');
const errorMessage = $('[form-message]');
const NUMBERS = /^[0-9]*$/; // only numbers from 0 to 9

//* Validators
const validateInput = _ => 
  checkIfEmpty(input) || !checkIfNumber(input) ? false : true;

//* Utility functions
const checkIfEmpty = field => {
  if (isEmpty(field.value.trim())) {
    setInvalid('Please fill out this field!');
    return true;
  } else {
    setValid();
    return false;
  }
}

const isEmpty = value => value === '';

const checkIfNumber = field => {
  if (isNumber(field.value.trim())) {
    setValid()
    return true
  } else {
    setInvalid('This field must contain numbers!')
    return false;
  }
}

const isNumber = value => value.match(NUMBERS);

const setInvalid = message => {
  form.classList.add('invalid');
  errorMessage.innerText = message;
  result.innerHTML = '';
}

const setValid = _  => {
  form.classList.remove('invalid');
  errorMessage.innerText = '';
}

const generateRandomArray = _ => {
  const inputValue = input.value.trim();
  const arrayLength = parseInt(inputValue);
  const randomArray = Array.from(
    {length: arrayLength}, 
    () => Math.floor(Math.random() * arrayLength)
  );
  return randomArray;
}

const renderResult = _ => {
  const randomArray = generateRandomArray();
  result.innerHTML = `
    <strong>Result</strong>: [${randomArray}]      
  `
}

//* Handle events (on blur, on input, on submit)
const handleEvents = _ => {
  input.onblur = _ => validateInput();
  input.oninput = _ => setValid();
  
  form.onsubmit = (event) => {
    //todo Prevent default behavior
    event.preventDefault();
    //todo Render html
    if (validateInput()) renderResult();
  };
}

handleEvents();
