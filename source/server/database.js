"use strict"

/*
    This file is for functions that connect the SQL database to main backend, server.js
*/

//=========================== Required Libs ============================================================================================================================

const mysqlSync = require("sync-mysql");                        //Syncronous SQL database queries
const bcrypt = require("bcrypt");                               //Password Hashing
const credValidator = require("../client/src/userCode");        //Username and Pasword Validation
const databaseCreds = require("./databaseCredentials.json");    //Database Username, Password, and Host

let database = new mysqlSync(databaseCreds);

function hashPassword(password){
    return bcrypt.hashSync(password, Number(10));
}

//=========================== User Models (Ask James if you need help understanding these) ==============================================================================
//All SQL queries should take place exclusively within the User Model

//This object models a user
class User{
    #userID         //User ID must be private so it dosn't turn into JSON and get sent client side, also shouldn't be changed from outside
    #oldFavorites   //preserve the orginal favorites updating favorites
    #deleted        //Weather the object has been deleted
    /*  1) new User(username) : get a user who already exists
        2) new User(username, password, prevPassword, email, phone) : create a new user  */
    constructor(...params){
        if(params.length == 5){  // constructor of type 1
            if(connection.query("SELECT user FROM users WHERE user=?", params[0]).length != 0)
                throw new Error("Username is already taken!");
            connection.query("INSERT INTO users(user, pw, pw_prev, email, phone) VALUES (?, ?, ?, ?, ?)", params);
        }else if(params.length != 1) // constructor of type neither one nor 2
            throw new Error("Invalid Construction of User Object");
        row = connection.query('SELECT * FROM users WHERE user=?', username);
        this.#userID = row.id;
        this.username = row.user;
        this.email = row.email;
        this.phone = row.phone;
        this.favorites = connection.query("SELECT hotel_id FROM favorites WHERE user_id=?", this.#userID);
        this.passHash = row.pw;
        this.prevPassHash = row.pw_prev;
        this.#deleted = false;
        this.#oldFavorites = this.favorites;    //preserve the orginal favorites updating favorites
    }

    //return user info to the client
    getClientObject(){
        return {username: this.username, email: this.email, phone: this.phone, favorites: this.favorites};
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
    let username = query.username, password = query.password, email = query.email, phone = query.phone;
    let returnObject = {};
    try{
        returnObject.errors = credValidator.credValidation(username, password, email, phone);     //re-validate credentials server side
        if(returnObject.errors.length != 0){
            returnObject.errors.push("If you are seeing this message, you are illegally using the /GarlicAccountCreationEndpoint endpoint")
            return returnObject;
        }
        pwHash = hashPassword(password);
        let userModel = new UnsafeUser(username, password, null, email, phone);
        returnObject.user = userModel.getClientObject();
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

