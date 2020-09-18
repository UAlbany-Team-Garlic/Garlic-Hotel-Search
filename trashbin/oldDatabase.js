"use strict"

//This is a copy of database back when it used multiple user classes with inheritance

/*
    This file is for functions that connect the SQL database to main backend, server.js
*/

//=========================== Required Libs ============================================================================================================================

const mysqlSync = require("sync-mysql");                        //Syncronous SQL database queries
const bcrypt = require("bcrypt");                               //Password Hashing
const credValidator = require("../client/src/userCode");        //Username and Pasword Validation
const databaseCreds = require("./databaseCredentials.json");    //Database Username, Password, and Host

let database = new mysqlSync(databaseCreds);

//=========================== User Models (Ask James if you need help understanding these) ==============================================================================
//All SQL queries should take place exclusively within the User Models

//I regret using OOP in JS to try modeling anything, apparently upcasting isn't even possable :(
//https://stackoverflow.com/questions/63949482/javascript-es6-upcast-subclass-to-super-class

//This object represents a user that can be passed back to the client and contains no sensitive info
class SafeUser{
    #userID     //User ID must be private so it dosn't turn into JSON and get sent client side, also shouldn't be changed from outside
    #row        //The OG row used for accessing query results in the subclasses
    constructor(username){
        this.#row = connection.query('SELECT * FROM users WHERE user=?', username);
        this.#userID = this.#row.id;
        this.username = this.#row.user;
        this.email = this.#row.email;
        this.phone = this.#row.phone;
        this.favorites = connection.query("SELECT hotel_id FROM favorites WHERE user_id=?", this.#userID);
    }
}

//This object represents a modifyable user and should be used exclusivly in the backend and contains more sensitive info
class UnsafeUser extends SafeUser {
    #oldFavorites   //preserve the orginal favorites updating favorites
    #deleted        //Weather the object has been deleted
    /*  1) new UnsafeUser(username) : get a user who already exists
        2) new UnsafeUser(username, password, prevPassword, email, phone) : create a new user  */
    constructor(...params){
        if(params.length == 5){  // constructor of type 1
            if(connection.query("SELECT user FROM users WHERE user=?", params[0]).length != 0)
                throw new Error("Username is already taken!");
            connection.query("INSERT INTO users(user, pw, pw_prev, email, phone) VALUES (?, ?, ?, ?, ?)", params);
        }else if(params.length != 1) // constructor of type neither one nor 2
            throw new Error("Invalid Construction of UnsafeUser Object");
        super(params[0]);
        this.passHash = this.#row.pw;
        this.prevPassHash = this.#row.pw_prev;
        this.#deleted = false;
        this.#oldFavorites = this.favorites;    //preserve the orginal favorites updating favorites
    }

    updateInDB(){ //Update user with any changed properties in the database
        if(this.#deleted)
            throw new Error("Can not update a deleted user!");
        connection.query("UPDATE users SET user=?, pw=?, pw_prev=?, email=?, phone=? WHERE id=?",[
            this.username, this.passHash, this.prevPassHash, this.email, this.phone]);
        let deletedFavs = this.#oldFavorites.filter(e => !this.favorites.includes(e)); //in oldFavorites not favorites  
        for(let i = 0; i < deletedFavs.length; i++) 
            connection.query("DELETE FROM favorites WHERE user_id=? AND hotel_id=?", [this.#userID, deletedFavs[i]]);
        let newFavs = this.favorites.filter(e => !this.#oldFavorites.includes(e));      //in favorites not oldFavorites
        for(let i = 0; i < newFavs.length; i++)
            connection.query("INSERT INTO favorites(user_id, hotel_id) VALUES (?, ?)", [this.#userID, newFavs[i]]);
    }

    removeFromDB(){     //remove a user from the database
        this.#deleted = true;
        connection.query("DELETE FROM users WHERE user_id=?", this.#userID);
        connection.query("DELETE FROM favorites WHERE user_id=?", this.#userID);
    }
}

//=========================== User Functions ==============================================================================

function newUser(query){
    let username = query.username;
    let password = query.password;
    let email = query.email;
    let phone = query.phone;
    let returnObject = {};
    try{
        returnObject.errors = credValidator.credValidation(username, password, email, phone);     //re-validate credentials server side
        if(returnObject.errors.length != 0){
            returnObject.errors.push("If you are seeing this message, you are illegally using the /GarlicAccountCreationEndpoint endpoint")
            return returnObject;
        }
        pwHash = bcrypt.hashSync(password, Number(10));
        let userModel = new UnsafeUser(username, password, null, email, phone);
        returnObject.user = (SafeUser)userModel;
    }catch(error){
        returnObject.errors.push("Server Side Error:" + error.message)
    }finally{
        return returnObject;
    }
}

exports.newUser = newUser;

function deleteUser(username, password){}

exports.deleteUser = deleteUser;

function addFavorite(){}

exports.addFavorite = addFavorite;

function removeFavorite(){}

exports.removeFavorite = removeFavorite;

function updateDetails(){}

exports.updateDetails = updateDetails;

