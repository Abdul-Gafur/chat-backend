const express = require("express");
const { PORT } = require("./config");
const app = express();

app.get("/", (req, res) => {
  res.json({ id: 1, text: "hello" });
});

app.listen(process.env.PORT || 8888, () => {
  console.log(`Server runned on port ${PORT}. URL: http://localhost:${PORT}/`);
});
