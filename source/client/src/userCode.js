
/*
    This file contatins all frontend code involved with the user inclduing
        User Creation
        CredentialValidation also used server side 
*/

//================ USER CREATION ===========================

//Use this function to set up the frontend to display errors durring user creation
function newUserError(errors){
    for(let i = 0; i < errors.length; i++)  //Right now it just console.error s all issues
        console.error("User Creation Error:" + error);
}

//Use this function to set up the frontend to display sucess after an account is sucessfully created
function newUserSuccess(user){
    console.log(user);
}

//We run these both client and server side to ensure only things that really pass this get into the database
//THIS IS THE ONLY FUNCTION THAT SHOULD BE USED FRONT END AND BACKEND, DO NOT PUT NODE OR FRONTEND EXCLUSIVE CODE IN HERE
function credValidation(username, password){
    // configs // Stolen from ethans old validator
    const PW_MIN_LENGTH = 8;
    const PW_MAX_LENGTH = 69; //set to whatever the db supports (or we could just set it to 16 lmao)
    const UN_MIN_LENGTH = 3;
    const UN_MAX_LENGTH = 16;
    let errors = []; 
    if(password.length < UN_MIN_LENGTH || password.length > UN_MAX_LENGTH)      //Check usernames meet length requirements
        errors.push("Usernames must be between" + UN_MIN_LENGTH + " and " + UN_MAX_LENGTH);
    if(password.length < PW_MIN_LENGTH || password.length > PW_MAX_LENGTH)      //Check passwords meet length requirements
        errors.push("Passwords must be between" + PW_MIN_LENGTH + " and " + PW_MAX_LENGTH);
    if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]/.test(pw))                  //Check passwords meet complexity requirements
        errors.push("Password must contain at least one lowercase, one uppercase, and one number");
    return errors;
}
//export cred validation so it can be used backend
exports.credValidation = credValidation;

//This function will be called 
export function newUser(){
    //Get New User Data
    let username = "";//document.getElementById().value; 
    let password = "";//document.getElementById().value;
    let confirmPassword = "";//document.getElementById().value;

    //Check for errors client side first to free up server processing time
    let errors = credValidation(username, password)   //Check credential properties, need to be re-checked backend
    if(password != confirmPassword)                   //Check passwords match
        errors.push("Passwords do not match!");
    if(errors.length != 0){
        newUserError(errors); 
        return;
    }

    //Since we're using HTTPS we can send the raw username and password
    fetch("/GarlicAccountCreationEndpoint?username=" + username + "&password=" + password)
    .then(response => response.json())               //convert return data to json
    .then(function(response){   //Callback from backend
        if(response.errors.length != 0){
            newUserError(response.errors);
            return;
        }
        newUserSuccess(response.user);
    }).catch(function(reason){  //Unexpected fetch fault 
        newUserError(["Unexpected new user fetch() fault: " + reason]);
    });
} 