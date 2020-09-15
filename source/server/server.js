"use strict"

const express = require("express");
const HotelAPI = require("./API");

//Express Setup
let app = express(); //initilize the express app
process.chdir(__dirname + "/../client/build"); //Past this point act like we're in the "client/build" directory so we can send frontend pages

//Routing Setup
app.use(express.static(".")); //use default static routing for anything not specified

//use index.html as our homepage, send it when "root page" is requested
app.get("/", function(req, res){
    res.sendFile(process.cwd() + "/index.html");
});

//Handle search requests
app.get("/GarlicSearchEndpoint", function(req, res){ 
    let searchText = decodeURI(req.query.search);
    console.log("Recived Request to search for "+ searchText);
    let listingObject = HotelAPI.search(searchText);    //Call our hotel search interface in API.js 
    res.json(listingObject);
});

//Start
app.listen(8080); 