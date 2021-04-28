import express from 'express';
import dateController from './controller/controller.js';
const app = express();
const port = process.env.port || 3000;



app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', 'ejs')


app.get("/", dateController.getCalenderData);

app.get("/:id", dateController.getIdProduct);

app.post("/", dateController.postEvent);

app.put('/:id', dateController.putEvent)

app.delete("/:id", dateController.deleteEvent);


app.listen(port, () => {
    console.log("I'm listening", port, "YOU CAN DO IT MARTIN...... YOU CAN DO IT!");
})


 