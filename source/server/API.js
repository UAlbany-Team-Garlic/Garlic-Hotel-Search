"use strict"

/*
    This file is for functions that connect the Hotel Info API to main backend, server.js
*/

function getInfo(data){
    return //returned API Data
}

class Listing{
    constructor(name, address, bedNums, preTaxNight,
        features, checkin, checkout, images, contactNum, rating){
        this.name = name;
        this.address = address;
        this.bedNums = bedNums;
        this.preTaxNight = preTaxNight;
        this.features = features; // list
        this.checkin = checkin;
        this.checkout = checkout;
        this.images = images; // list
        this.contactNum = contactNum;
        this.rating = rating;
    }
}
class Bed{
    constructor(name){
        this.name = name; // Full, King or Queen
    }
}
