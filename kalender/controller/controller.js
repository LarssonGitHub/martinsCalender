import models from "../models/models.js";

function getIndex(req, res) {
    res.status(200).render('../public/views/index', {});
}

function getCalenderData(req, res) {
    console.log("getdata");
    let data = models.findAll();
    res.send(data);
}

function getIdProduct(req, res) {
    console.log("get id called");
    const id = req.params.id;
    const data = models.findByID(id);
    //värdefull kontrol!
    if (data.length === 0) {
        res.status(400).send({
            message: `Error 400, bad request dude, no id of ${id}`
        });
        return;
    }
    res.send(data);
}

function postEvent(req, res) {
    console.log("post event called");
    const body = req.body;
    let validation = models.validatePostEvent(body);
    if (validation === false) {
        res.status(400).json({
            message: "Failed to add new event!"
        });
        return;
    }
    res.status(200).json({
        message: "New event added!"
    })
}


function putEvent(req, res) {
    console.log("Edit event called");

    //A way to get id and make it better..
    const id = req.params.id;
    const {
        body
    } = req;
    console.log("this is...", id);

    let validation = models.validatePutEvent(id, body);

    if (validation === false) {
        res.status(400).send({
            message: "Couldn't edit event!"
        });
        return;
    }
    res.send({
        message: "Event edited!"
    })
}

function deleteEvent(req, res) {
    console.log("delete Event called");
    const id = req.params.id;
    console.log(id);
    const validation = models.validateDeleteEvent(id);
    console.log(validation);
    if (validation === false) {
        res.status(400).json({
            message: "Couldn't remove product"
        });
        return;
    }
    res.json({
        message: "Product removed!"
    });
}

export default {
    getCalenderData,
    postEvent,
    getIdProduct,
    putEvent,
    deleteEvent,
    getIndex
};