const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const { PORT } = require("./config");
const app = express();

mongoose.connect(process.env.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ id: 1, text: "hello" });
});

app.listen(process.env.PORT || 8888, () => {
  console.log(`Server runned on port ${PORT}. URL: http://localhost:${PORT}/`);
});
