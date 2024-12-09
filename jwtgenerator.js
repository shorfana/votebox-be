// const crypto = require("crypto");

// // Generate a 256-bit (32-byte) secret key
// const secret = crypto.randomBytes(32).toString("base64");

// console.log("Your JWT Secret:", secret);

const { v4: uuidv4 } = require("uuid");
const principalId = uuidv4();
console.log(principalId); // Outputs a unique UUID
