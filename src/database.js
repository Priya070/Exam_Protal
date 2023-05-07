const mongoose = require("mongoose");
const port = 3000;
const mongoUrl =
  "mongodb://0.0.0.0:27017/expo";

const connectToMongo = mongoose
  .connect( process.env.MONGOURI || mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB", error));

module.exports = connectToMongo;
