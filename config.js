require("dotenv").config();

const PORT = process.env.PORT || 8888;
const mongoURI = process.env.mongoURI || null;
const jwtKey = process.env.jwtKey || "test";

module.exports = { PORT, mongoURI, jwtKey };
