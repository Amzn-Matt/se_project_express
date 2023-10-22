const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect(
  "mongodb://127.0.0.1:27017/wtwr_db",
  () => {
    console.log("DB is connected");
  },
  (e) => console.log("DB ERROR", e),
);

const routes = require("./routes");

app.use(express.json());

app.use(helmet());

app.use(routes);

app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});
