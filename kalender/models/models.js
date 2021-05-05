import fs from 'fs';

const randStr = () => {
    const lettersAsString = `A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,0,1,2,3,4,5,6,7,8,9`;
    const letters = lettersAsString.split(',');
    let randStr = '';
    for (let i = 0; i < 40; i++) {
        randStr += letters[Math.floor(Math.random() * letters.length)];
    };
    return randStr;
};

const getJsonData = fs.readFileSync('./data/dataEvents.json', 'utf-8');
let parseJsonData = JSON.parse(getJsonData);

function writeToJsonArray(stuffToAdd) {
    fs.writeFileSync('./data/dataEvents.json', JSON.stringify(stuffToAdd), 'utf-8');
    return;
}

function findAll() {
    try {
        return parseJsonData;
    } catch (err) {
        console.log(err);
        return errors.ErrorHandling();
    }
}

function findByID(id) {
    //You NEEEEEEEED to validate this
    return parseJsonData.filter(prod => prod.id === id);
}

function filterOut(id) {
    return parseJsonData.filter(prod => prod.id !== id);
}

function validatePostEvent(body) {
    console.log(body);
    try {
        if (body.title === "testfail") {
            throw `you typed testfail`;
        }
        let newEvent = {
            id: randStr(),
            title: body.title || "Ej Angivet",
            date: body.date || "Ej Angivet",
            starttime: body.starttime || "Ej Angivet",
            endtime: body.endtime || "Ej Angivet",
            notes: body.notes || "Ej Angivet"
        };
        parseJsonData.push(newEvent);
        writeToJsonArray(parseJsonData);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

// function validatePutEvent(id, body) {
function validatePutEvent(id, body) {

    try {
        if (body.editTitle === "testfail") {
            throw `you failed test`;
        }

        // Update product
        const updateEvent = {
            id: body.id,
            title: body.editTitle || "you shouldn't see this",
            date: body.editDate || "you shouldn't see this",
            starttime: body.editStarttime || "you shouldn't see this",
            endtime: body.editEndtime || "you shouldn't see this",
            notes: body.editNotes || "you shouldn't see this"
        }

        let filterOutPut = filterOut(id);
        filterOutPut.push(updateEvent);
        writeToJsonArray(filterOutPut)
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

function validateDeleteEvent(id) {
    console.log(id);
    try {
        const productExist = findByID(id);

        if (productExist.length === 0) {
            throw `No product found with id ${id}`
        }

        // filter out the old product

        let filterOutdelete = filterOut(id)

        writeToJsonArray(filterOutdelete);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export default {
    findAll,
    validatePostEvent,
    findByID,
    validatePutEvent,
    filterOut,
    validateDeleteEvent
};