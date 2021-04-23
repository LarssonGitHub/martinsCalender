import ProductModel from '../models/readAndResturn.js';


function getAllProducts(req, res) {
    const products = ProductModel.findAll();
    res.send({
        data: products
    });

}

//Find a better way to error handle this...
function getIdProduct(req, res) {
    const id = req.params.id;
    const canFind = ProductModel.finByID(id);
    //värdefull kontrol!
    if (canFind.length > 0) {
        res.status(200).send(canFind);
    } else {
        res.status(400).send({
            message: `Error 400, bad request dude, no id of ${id}`
        });
    }

}

function postProduct(req, res) {
    const body = req.body;
    ProductModel.post(body);
    res.status(200).send({
        a: "shit got posted"
    });
}

//Sorry Henry, I'm stealing yours! 
//DRY DRY DRY DRY DRY DRY titta i getById, remake this into a foreach/find.. Think in reverse to this...
// horrible way to edit..., function and need to put up rules. Nothing is written to the josn though...
//Steal Henry's and rewrite it when you work on calender.
// function editProduct(req, res) {
//     const body = req.body;
//     const id = req.params.id;
//     const canEdit = ProductModel.finByID(id);
//     if (canEdit.length > 0) {

//         // horrible way to edit..., function and need to put up rules. Nothing is written to the josn though...
//         // canEdit[0].id = 3;
//         // canEdit[0].name = body.name || true;
//         // canEdit[0].description = body.name || "something added";
//         // canEdit[0].price = body.name || 0;


//         const products = ProductModel.findAll();

//     console.log(canEdit[0].id);
//         res.status(200).json(
//             products
//         );

//     } else {
//         res.status(400).send({
//             message: `Error 400, bad request dude, no id of ${id} can not edit`
//         });
//     }

// }

function editProduct(req, res) {
    //A way to get id and make it better..
    const {
        id
    } = req.params;
    const {
        body
    } = req;

    const success = ProductModel.edit(id, body);

    if (success) {
        res.status(201).json({
            message: "Product update!"
        })
    } else {
        res.status(400).json({
            message: "Product update failed!"
        });
    }
}

// // Shot method to delete..
// function deleteProduct(req, res) {
//     const item = ProductModel.finByID(req.params.id);
//     if (item.length === 0) {
//         res.status(400).send({
//             message: `Error 400, bad request dude, no id of ${req.params.id} can not delete`
//         });
//         return;
//     }
//     let newItems = ProductModel.deleteById(req.params.id);

//     res.send({
//         newItems
//     })
// }

//https://stackoverflow.com/questions/5310304/remove-json-element

function deleteProduct(req, res) {
    console.log("I got triggered!");
    const {id} = req.params;

    //Note how he sends his data to another function/module, which DOES ALL json editing, and then returns a true
    //or False value.. And boolean is success which says yes or no at the bottom
    const success = ProductModel.deleteById(id);

    if (success) {
        res.status(200).json({message: "Product removed!"})
    } else {
        res.status(400).json({message: "Product remove failed!"});
    }
}

function pageNotfound(req, res) {
    res.status(404).send({
        message: `Don't try to search for things in my URL that do not exist buddy! YOU USED METHOD:  ${req.method}`
    });
};

export default {
    getAllProducts,
    getIdProduct,
    postProduct,
    pageNotfound,
    editProduct,
    deleteProduct
};