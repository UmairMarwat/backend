const { config } = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
config();
const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.urlencoded({ extended: false }));

const userRoute = require("./routers/user");

app.get("/", (req, res) => {
  res.send("anoony");
});

app.use("/", userRoute);

mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    app.listen(port);

    console.log("Server Created and DB Connected!!");
  })
  .catch(() => {
    console.log("NOT connected");
  });
