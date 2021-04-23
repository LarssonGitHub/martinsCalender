import fs from "fs";

//Isaks function for id reandomizer....
const randStr = () => {
    const lettersAsString = `A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,0,1,2,3,4,5,6,7,8,9`;
    const letters = lettersAsString.split(',');
    let randStr = '';
    for (let i = 0; i < 40; i++) {
        randStr += letters[Math.floor(Math.random() * letters.length)];
    };
    return randStr;
}

//You need to use fs to read file...! Always remmeber to use methods.
// All damn functions to sort! Nicer and cleaner structure this way, yay

//This grabs the api.. the file, so you can use it later!
let products = JSON.parse(fs.readFileSync('./data/products.json', 'utf-8'));

//Find all function!
function findAll() {
    return products;
}

//find by id
function finByID(id) {
    return products.filter(prod => prod.id === id);
}

function post(body){
        //Not sure if I need ot stringfy and parse this json...
            const newProduct = {
                id: randStr(),
                name: body.name || "untitled",
                description: body.description || "no desc",
                price: body.price || 99
            }
            products.push(newProduct);
            fs.writeFileSync('./data/products.json', JSON.stringify(products), 'utf-8');
        return;
}

function edit(id, body) {
    try {
        // Find the product
        const productToUpdate = products.filter(prod => prod.id === id);
       
        // Check if it exsists
        if (productToUpdate.length === 0) {
            console.log("yoou see me");
            //Throw makes it easier for try.. Jumps directly, no need for return
            throw `No product found with id: ${id}`;
        }

        // Update product
        const updatedProduct = {
            id: productToUpdate[0].id,
            name: body.name || "1unded",
            description: body.description || "unded",
            price: body.price || "unded"
        }

       
        // Clean out the old product
        products = products.filter(prod => prod.id !== id);
        console.log(products);
        // Add new product        
        products.push(updatedProduct);

        // Save
        fs.writeFileSync('./data/products.json', JSON.stringify(products), 'utf-8');

        return true;
    } catch(error) {
        console.log(error);
        return false;
    }
}


// //Horrible way...
// function deleteById(id) {
//     return products.filter(prod => prod.id !== id);
// }

function deleteById(id) {
    try {
        const productToRemove = products.filter(prod => prod.id === id);

        if (productToRemove.length === 0) {
            throw `No product found with id ${id}`
        }

        // filter out the old product
        products = products.filter(prod => prod.id !== id);

        // Save
        fs.writeFileSync('./data/products.json', JSON.stringify(products), 'utf-8');
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}


export default {findAll, finByID, deleteById, edit, post};