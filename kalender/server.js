import express from 'express';
import dateController from './controller/controller.js';
// import path from 'path';
// import fs from 'fs';
const app = express();
const port = process.env.port || 3000;


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs')

app.get("/", dateController.getIndex);

app.get("/api/", dateController.getCalenderData);

app.get("/api/:id", dateController.getIdProduct);

app.post("/api/", dateController.postEvent);

app.put('/api/:id', dateController.putEvent)

app.delete("/api/:id", dateController.deleteEvent);

app.listen(port, () => {
    console.log("I'm listening", port, "YOU CAN DO IT MARTIN...... YOU CAN DO IT!");
})


 