import models from "../models/models.js";


function getCalenderData(req, res) {
    console.log("getdata");
    let data = models.findAll();
    // console.log(data);
    // res.status(200).send();
    res.status(200).render('index', {
        jsonData: data
    });
}

function getIdProduct(req, res) {
    console.log("get id called");
    const id = req.params.id;
    const canFind = models.finByID(id);
    //värdefull kontrol!
    if (canFind.length > 0) {
        res.status(200).send(canFind);
    } else {
        res.status(400).send({
            message: `Error 400, bad request dude, no id of ${id}`
        });
    }
}

function postEvent(req, res) {
    console.log("postevnt event called");
    const body = req.body;
    let validation = models.validatePostEvent(body);

    if (validation) {
        res.status(200).json({
            message: "Product added!"
        })
    } else {
        res.status(400).json({
            message: "Product remove failed!"
        });
    }
}

function putEvent(req, res) {
    console.log("Edit event called");

    //A way to get id and make it better..
    const id = req.params.id;
    const {
        body
    } = req;
    console.log("this is...", id);
    //henrys
    // const success = models.validatePutEvent(id, body);
    const success = models.validatePutEvent(id, body);

    if (success) {
        res.status(201).send({
            message: "Product update!"
        })
    } else {
        res.status(400).send({
            message: "Product update failed!"
        });
    }
}

function deleteEvent(req, res) {
    console.log("delete Event called");
  const id = req.params.id;
    console.log(id);
   
    
    const success = models.validateDeleteEvent(id);

    if (success) {
        res.status(200).json({
            message: "Product removed!"
        })
    } else {
        res.status(400).json({
            message: "Product remove failed!"
        });
    }
}

export default {
    getCalenderData,
    postEvent,
    getIdProduct,
    putEvent,
    deleteEvent
};