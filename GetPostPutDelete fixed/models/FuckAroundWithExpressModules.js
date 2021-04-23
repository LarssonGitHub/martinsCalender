

//How to use middleware! Middleware functions! note the next method! call: Stored in server.js
const logger = (req, res, next) => {
    console.log("this is a Middleware functions..", "you used the method", req.method);
    next();
};

export default {logger};