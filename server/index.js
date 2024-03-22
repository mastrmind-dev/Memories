"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const env = require("dotenv");

env.config();
const app = express();

app.use(cors());

app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

const postRouter = require("./routes/postsRouter");

app.use("/posts", postRouter);

const PORT = process.env.PORT || 4000;
const CONNECTION_URL = process.env.MONGO_URI;

//to supress deprecation warnings
mongoose.set("strictQuery", false);

mongoose
  .connect(CONNECTION_URL, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`app is listening to port: ${PORT}...`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
