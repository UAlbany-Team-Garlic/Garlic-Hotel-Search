"use strict";

//================= Lib Imports ========================================================================================

const express = require("express");
const session = require("express-session");

const HotelAPI = require("./API");
const DatabaseInterface = require("./database");


//================= Express and Routing Setip ==========================================================================

let app = express(); //initilize the express app
process.chdir(__dirname + "/../client/build"); //Past this point act like we're in the "client/build" directory so we can send frontend pages

//Routing Setup
app.use(express.static(".")); //use default static routing for anything not specified
app.use(session({secret: "GarlicHotelSearch"})); //set up sessions with a unique secret for ID generation

//use index.html as our homepage, send it when "root page" is requested
app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/index.html");
});


//================== Endpoint Handlers ===================================================================================

//Handle search requests
app.get("/GarlicSearchEndpoint", function (req, res) {
  let searchText = decodeURI(req.query.search);
  let dateRange = decodeURI(req.query.dates);
  console.log("Recived Request to search for " + searchText);
  let listingObject = HotelAPI.search(searchText); //Call our hotel search interface in API.js
  res.json(listingObject);
});

//Account Creation Handling
app.get("/GarlicAccountCreationEndpoint", function(req, res){
    if(!req.session || !req.session.user){  //If there is no session or session has no associated user
        let newUserReturnObject = DatabaseInterface.newUser(req.query);
        if(newUserReturnObject.errors.length == 0)  //If there were no user creation errors
            req.session.user = newUserReturnObject.user;
        return res.json(newUserReturnObject);
    }
    return new DatabaseInterface.UserRes(null, ["Can not create an account while having an active user session"]);
});

/*
//Login / Authentication Handling
app.get("/GarlicAuthEndpoint", function(req, res){ 
    
    //console.log("Recived Request to search for "+ searchText);
});

//Update Handling
app.get("/GarlicUpdateUserEndpoint", function(req, res){ 
    
    //console.log("Recived Request to search for "+ searchText);
});
*/

//Start
app.listen(8080);
