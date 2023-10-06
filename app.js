const express = require("express");
const mongoose = require("mongoose");
const { PORT = 3001 } = process.env;

mongoose.connect(
  "mongodb://127.0.0.1:27017/wtwr_db",
  (r) => {
    console.log("DB is connected");
  },
  (e) => console.log("DB ERROR", e),
);

const routes = require("./routes/index");
app.use(routes);
app.use(express.json());

const app = express();
app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});
