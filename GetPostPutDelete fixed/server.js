//npm run dev

import express from "express";
import ProductController from './controllers/RequestAndResponse.js';

// //Uncomment this if you want to play around with node/expression.. Contains good exmaples
// import fuckAroundWithNode from "./models/FuckAroundWithExpressModules.js";
// app.use(fuckAroundWithNode.logger);

const app = express();

//  process.env.port check for an evnoirmental port, aka the envoirment in the server, since this isn't a server it's just uses 3000
const port = process.env.port || 3000;

//This way we tell body-parser to only use json :D
//This is older.. it's depcircated app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Get all prodcts via url
app.get("/", ProductController.getAllProducts);

//get a spevic id via url //Note it's not in root!
app.get("/:id", ProductController.getIdProduct);

//post shit
app.post("/", ProductController.postProduct);

//edit/update stuff
app.put("/:id", ProductController.editProduct);

//delete stuff
app.delete("/:id", ProductController.deleteProduct);

//Lazy fix if user decides to toy arouund with the url!
app.get('*', ProductController.pageNotfound);
app.post('*', ProductController.pageNotfound);
app.put('*', ProductController.pageNotfound);
app.delete('*', ProductController.pageNotfound);

app.listen(port, () => {
    console.log("I'm listening", port, "YOU CAN DO IT MARTIN...... YOU CAN DO IT!");
})