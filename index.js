//import your express into the index.js file
const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const userRoute = require("./route/route.user");
app.use(userRoute);

mongoose
  .connect(
    "mongodb+srv://fyneboy:tyradHlp7VzMRBqC@axiacohort7.jsmif.mongodb.net/Fyneboy"
  )
  .then(() => {
    console.log("Database successfully connected");
  })
  .catch(() => {
    console.log("Unable to connect");
  });

app.listen(4000, () => {
  console.log("app is running");
});
