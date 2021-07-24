const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const user = require("./src/routes/user");

const { PORT, mongoURI } = require("./config");
const app = express();

mongoose.connect(mongoURI, {
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
app.use("/user", user);

app.listen(PORT || 8888, () => {
  console.log(`Server runned on port ${PORT}. URL: http://localhost:${PORT}/`);
});
