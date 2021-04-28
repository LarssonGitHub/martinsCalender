
//Used to handle errors, make it more secure as to not use it outside server. Should I make it a clas?.......
// class Errors {
//     constructor(code, msg) {
//         this.code = code;
//         this.msg = msg;
//     }

// static BadRequest(msg) {
//     return new Errors(400, msg);
// }

// static internalError(msg) {
//     return new Errors(500, msg);
// }
// }

// export default {Errors};

// const PUT = async (url, data) => {
//     return fetch(`${serverAddr}${url}`, {
//         method: 'PUT',
//         headers: getHeaders(),
//         body: JSON.stringify(data)
//     }).then(response => response.json());
// };