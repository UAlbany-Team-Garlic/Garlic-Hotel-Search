"use strict"

let express = require("express");

//Express Setup
let app = express(); //initilize the express app
process.chdir(__dirname + "/../client/build"); //Past this point act like we're in the "client/build" directory so we can send frontend pages

//Routing Setup
app.use(express.static(".")); //use default static routing for anything not specified
app.get("/", function(req, res){    //use frontend.html as our meme homepage
    res.sendFile(process.cwd() + "/index.html");
});

//Start
app.listen(8080); 