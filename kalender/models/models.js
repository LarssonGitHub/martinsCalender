import fs from 'fs';
// import {check, ValidationError } from 'express-validation';
// const { check, ValidationError } = require('express-validation');

const randStr = () => { 
    const lettersAsString = `A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,0,1,2,3,4,5,6,7,8,9`; 
    const letters = lettersAsString.split(','); 
    let randStr = ''; 
    for(let i = 0; i < 40; i++) { 
        randStr += letters[Math.floor(Math.random() * letters.length)]; 
    }; 
    return randStr; 
};

const getJsonData = fs.readFileSync('./data/dataEvents.json', 'utf-8');
let parseJsonData = JSON.parse(getJsonData);

function findAll() {
    try {
        return parseJsonData;
    } catch (err) {
        console.log(err);
        return errors.ErrorHandling();
    }
}

function finByID(id) {
    //You NEEEEEEEED to validate this
    return parseJsonData.filter(prod => prod.id === id);
}

function filterOut(id) {
    return parseJsonData.filter(prod => prod.id !== id);
}

function parseEvent(jsonObject) {
    parseJsonData.push(jsonObject);
    fs.writeFileSync('./data/dataEvents.json', JSON.stringify(parseJsonData), 'utf-8'); 
    return;
}

function validatePostEvent(body) {
    console.log(body);
    try {
        if (body.title === "failpost") {
            throw `you typed failpost`;
        }
        let newEvent = {
            id: randStr(),
            title: body.title || "Untitled",
            date: body.date || "2001-12-12",
            starttime: body.starttime || "12-12-12",
            endtime: body.endtime || "12-12-12",
        };
        
        parseEvent(newEvent)
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

// function validatePutEvent(id, body) {
function validatePutEvent(id, body) {
    try {
        if (body.editTitle === "failtest") {
            console.log("are you here");
            //Throw makes it easier for try.. Jumps directly, no need for return
            throw `you failed test`;
        }

        // Update product
        const updateEvent = {
            id: body.id,
            title: body.editTitle || "you shouldn't see this",
            date: body.editDate || "you shouldn't see this",
            starttime: body.editStartime || "you shouldn't see this",
            endtime: body.endEndtime || "you shouldn't see this"
        }
       
        // console.log(updateEvent);
        //Change this var.... and make it work with post.. keep parse single, the pushing does in the eg post. Remvoe filterned not... var
        let filterNot = filterOut(id);
        filterNot.push(updateEvent);
        fs.writeFileSync('./data/dataEvents.json', JSON.stringify(filterNot), 'utf-8');

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

function validateDeleteEvent(id) {
    console.log(id);
    try {
        const productExist = finByID(id);

        if (!productExist) {
            throw `No product found with id ${id}`
        }

        // filter out the old product
        let filterNot = filterOut(id)
 
        fs.writeFileSync('./data/dataEvents.json', JSON.stringify(filterNot), 'utf-8');
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export default {
    findAll,
    parseEvent,
    validatePostEvent,
    finByID,
    validatePutEvent,
    filterOut,
    validateDeleteEvent
};