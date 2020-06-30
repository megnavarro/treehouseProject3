//Javascript for Treehouse Unit 3 Project

//Global Variables//
const bitcoinDiv = document.getElementById('bitcoin'); //defines div with all elements associated with bitcoin
const checkboxes = document.querySelectorAll('input[type=checkbox]'); //defines all checkbox input elements
const colorDefaultMessage = document.createElement('option');//creates option element for "No Theme Selected" for Color Selector
const colorSelector = document.getElementById('color'); //defines Color select element
const colorSelectorOptions = colorSelector.options; //defines Color option elements
const costTotalSpan = document.createElement('span'); //creates span element to hold total activity cost
const creditCardDiv = document.getElementById('credit-card'); //defines div with all elements associated with credit card
const creditCardInput = document.getElementById('cc-num'); //defines credit card number input element
const cvvInput = document.getElementById('cvv'); //defines credit card cvv input element
const designSelector = document.getElementById('design'); //defines Design select element 
const designSelectorOptions = designSelector.children; //defines Design option elements
const emailInput = document.getElementById('mail'); //defines email input element
const invalidBorderStyle = '3px solid red'; //sets style rules for input borders when user enters an invalid entry
const invalidEntryLabelEmail = document.createElement('label'); //creates label element for invalid entry message for email input
const invalidEntryLabelName = document.createElement('label'); //creates label element for invalid entry message for name input
const jobRoleOptions = document.querySelector('#title'); //defines Job Role select element
const nameInput = document.getElementById('name'); //defines name input element
const otherTitleTextInput = document.getElementById('other-title'); //input box for user to enter "other role" in Job Role Section
const paymentSelectorOptions = document.getElementById('payment').options; //defines Payment option elements
const paypalDiv = document.getElementById('paypal'); //defines div with all elements associated with PayPal
const zipCodeInput = document.getElementById('zip'); //defines credit card zipcode input element



//Variable Default Values and Attribute Additions//
colorDefaultMessage.textContent = 'Please select a T-shirt theme.';
colorSelector.appendChild(colorDefaultMessage);
otherTitleTextInput.style.display = 'none';
designSelectorOptions[0].selected = true;
colorSelector.hidden = true;
document.querySelector('.activities').appendChild(costTotalSpan);
costTotalSpan.innerHTML = 'Total = $0';
paymentSelectorOptions[0].setAttribute('disabled', 'disabled');
paymentSelectorOptions[1].selected = true;
creditCardDiv.style.display = 'block';
paypalDiv.style.display = 'none';
bitcoinDiv.style.display = 'none';
document.querySelector('fieldset').insertBefore(invalidEntryLabelName, nameInput);
invalidEntryLabelName.style.display = 'none';
document.querySelector('fieldset').insertBefore(invalidEntryLabelEmail, emailInput);
invalidEntryLabelEmail.style.display = 'none';

//Functions//
/*
* Sets focus on Name Input box on page load and refresh.
*/
function nameFocus () {
    document.getElementById('name').focus();
}

/*
 * Clears all input fields on page refresh.
 */
function clearInput() {
    const inputs = document.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }
}

/*
 * Hides all color selection options.
 */
function hideColorSelectorOptions() {
    for (let i = 0; i < colorSelectorOptions.length; i++) {
         colorSelectorOptions[i].hidden = true;
     }
 }

/*
 * Unchecks all checkboxes on page refresh.
 */
 function uncheckAll(){
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
    }
}

/*
 * Checks validity of value entered into Name Input field
 */
function isValidName(){
    const nameInputValue = nameInput.value;
    const nameCheck = /^[a-z]+$/i.test(nameInputValue);
    if (!nameCheck) {
        nameInput.style.border = invalidBorderStyle;
        invalidEntryLabelName.textContent = 'Name cannot be left blank. Please enter your name.';
        invalidEntryLabelName.id = 'invalid-entry';
        invalidEntryLabelName.style.display = 'block';
    } else {
        nameInput.style.border = '2px solid rgb(111, 157, 220)';
        invalidEntryLabelName.style.display = 'none';
    return nameCheck;
    }
}    

/*
 * Checks validity of value entered into Email Input field
 */
function isValidEmail() {
    const emailInputValue = emailInput.value;
    const emailCheck = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailInputValue);
    if (emailInputValue.length === 0) {
        invalidEntryLabelEmail.textContent = 'Email cannot be left blank. Please enter your email address.';
        invalidEntryLabelEmail.id = 'invalid-entry';
        invalidEntryLabelEmail.style.display = 'block';
        emailInput.style.border = invalidBorderStyle;
    } else if (!emailCheck) {
        invalidEntryLabelEmail.textContent = 'Invalid email. Please enter a valid email address. Ex. name@internet.com';
        invalidEntryLabelEmail.id = 'invalid-entry';
        invalidEntryLabelEmail.style.display = 'block';
        emailInput.style.border = invalidBorderStyle;
    } else {
        invalidEntryLabelEmail.style.display = 'none';
        emailInput.style.border = '2px solid rgb(111, 157, 220)';
    }
    return emailCheck;
}  

/*
 * Checks validity of value entered into Credit Card Number Input field
 */
function isValidCreditCard() {
    const creditCardValue = creditCardInput.value;
    const creditCardCheck = /^\d{13,16}$/.test(creditCardValue);
    if (!creditCardCheck) {
        creditCardInput.style.border = invalidBorderStyle;
    }
    return creditCardCheck;
}

/*
 * Checks validity of value entered into Zipcode Input field
 */
function isValidZipCode() {
    const zipCodeValue = zipCodeInput.value;
    const zipCodeCheck = /^\d{5}$/.test(zipCodeValue);
    if (!zipCodeCheck) {
        zipCodeInput.style.border = invalidBorderStyle;
    } 
    return zipCodeCheck;
}

/*
 * Checks validity of value entered into CVV Input field
 */
function isValidCVV() {
    const cvvValue = cvvInput.value;
    const cvvCheck = /^\d{3}$/.test(cvvValue);
    if (!cvvCheck) {
        cvvInput.style.border = invalidBorderStyle;
    }
    return cvvCheck;
}

/*
 * Checks validity of all input fields associated with the Credit Card Div
 */
function isCreditCardDataValid() {
    let isValid = true;
    if (paymentSelectorOptions[1].selected === true) {
        const isCreditCardNumberValid = isValidCreditCard();
        const isZipCodeNumberValid = isValidZipCode();
        const isCVVNumberValid = isValidCVV(); 
        isValid = isCreditCardNumberValid && isZipCodeNumberValid && isCVVNumberValid;
    }
    return isValid;
}

/*
 * Checks at least one activity is selected
 */
function isActivitySelectionValid() {
    const isActivityValid = costTotalSpan.innerHTML !== 'Total = $0';
    if (!isActivityValid) {
        costTotalSpan.style.border = invalidBorderStyle;
        costTotalSpan.style.padding = '2px';
    }
    return isActivityValid;
}


//Event Listeners//

/*
* If "Other" Job Role option is selected, displays a new input
* element for user to manually enter their job role.
*/
jobRoleOptions.addEventListener('click', (event) => {
    if (event.target.textContent === 'Other') {
        otherTitleTextInput.style.display = 'block';
    } else {
        otherTitleTextInput.style.display = 'none';
    }
});

/*
* Adds Event Listener to Design select options and hides
* color options based on selection.
*/
for (let i = 0; i < designSelectorOptions.length; i++)
    designSelectorOptions[i].addEventListener('click', function (event) {
        hideColorSelectorOptions();
        
        if (event.target.value === 'js puns') {
            colorSelector.hidden = false;
            designSelectorOptions[0].disabled = true;
            colorSelectorOptions[0].selected = true;
            colorSelectorOptions[0].hidden = false;
            colorSelectorOptions[1].hidden = false;
            colorSelectorOptions[2].hidden = false;
         } else if (event.target.value === 'heart js'){
            colorSelector.hidden = false;
            designSelectorOptions[0].disabled = true;
            colorSelectorOptions[3].selected = true;
            colorSelectorOptions[3].hidden = false;  
            colorSelectorOptions[4].hidden = false;
            colorSelectorOptions[5].hidden = false; 
        };
        
});

/*
* Adds Event Listener to Activities fieldset element and sets conditions to disable
* activity input options with conflicting times and dates as one checked by user.
*/
document.querySelector('.activities').addEventListener('change', function (event) {
    const activityLabels =  document.querySelectorAll('.activities label');
    const clicked = event.target;
    const clickedDateTime = clicked.getAttribute('data-day-and-time');
    const clickedDataCost = clicked.getAttribute('data-cost');
    let costTotal = 0;

    for (let i = 0; i < checkboxes.length; i++){
        const checkboxDateTime = checkboxes[i].getAttribute('data-day-and-time');
        if (clickedDateTime == checkboxDateTime && clicked !== checkboxes[i]){
            if(clicked.checked){
                checkboxes[i].disabled = true;
                activityLabels[i].style.color = '#C8C8C8';
            } else {
                checkboxes[i].disabled = false;
                activityLabels[i].style.color = 'black';
            }
        }
        if (checkboxes[i].checked){
            costTotal += +checkboxes[i].getAttribute('data-cost');
        }
      costTotalSpan.innerHTML = `Total = $${costTotal}`;  
    }
});

/*
* Adds Event Listener on Payment Options and sets conditions to show specific Divs
* based on the option clicked.
*/
for (let i = 0; i < paymentSelectorOptions.length; i++) {
    paymentSelectorOptions[i].addEventListener('click', () => {
        if (i === 1){
            creditCardDiv.style.display = 'block';
            paypalDiv.style.display = 'none';
            bitcoinDiv.style.display = 'none';
            paymentSelectorOptions[1].selected = true;
            paymentSelectorOptions[2].selected = false;
            paymentSelectorOptions[3].selected = false;
        } else if (i === 2) {
            creditCardDiv.style.display = 'none';
            paypalDiv.style.display = 'block';
            bitcoinDiv.style.display = 'none';
            paymentSelectorOptions[1].selected = false;
            paymentSelectorOptions[2].selected = true;
            paymentSelectorOptions[3].selected = false;
        } else if (i === 3) {
            creditCardDiv.style.display = 'none';
            paypalDiv.style.display = 'none';
            bitcoinDiv.style.display = 'block';
            paymentSelectorOptions[1].selected = false;
            paymentSelectorOptions[2].selected = false;
            paymentSelectorOptions[3].selected = true;
        }
    });
}

// Adds Event Listener to check name input validity when user clicks away from field
nameInput.addEventListener('blur', () => { isValidName();});

// Adds Event Listener to check email input validity when user clicks away from field
emailInput.addEventListener('blur', () => { isValidEmail();});

// Adds Event Listener to check name, email, credit card (including zipcode and CVV code), and activity selection input validity when user clicks submit button
document.addEventListener('submit', (event) => {
    if (!isValidName() | !isValidEmail() | !isActivitySelectionValid() | !isCreditCardDataValid()) {
        event.preventDefault();
    } else {
        event.preventDefault();
        console.log('data accepted');
    }   
});

//Call Functions//

nameFocus();
clearInput();
uncheckAll();
hideColorSelectorOptions();








