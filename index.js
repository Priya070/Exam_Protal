const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
// const mongoose = require('mongoose');
const cors = require("cors");
const app = express();
const port = 3000;
// const mongoUrl = 'mongodb://0.0.0.0:27017/expo';

// Connect to MongoDB
// mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(error => console.error('Error connecting to MongoDB', error));
// first is above method to connect here is second method
const connectToMongo = require("./src/database.js");
connectToMongo;

app.use(cors());
// Parse request bodies as JSON
app.use(bodyParser.json());
// app.use(express.static('public'))

// login API endpoint
app.use("/api", require("./routes/auth.js"));

//syllabus create api
const syllabusRoute = require("./routes/syllabus.js");
app.use("/api", syllabusRoute);

//backpaper registration api
app.use("/api", require("./routes/backpaper.js"));

//result
app.use("/api", require("./routes/result.js"));

//seating arrangement
app.use("/api", require("./routes/seating.js"));

//schedule
app.use("/api", require("./routes/schedule.js"));

//connect to public folder files
console.log(path.join(__dirname, "/public"));
app.use(express.static(path.join(__dirname, "/public")));

// Serve the "index.html" file for all other requests
app.get("/", (req, res) => {
  res.sendFile(
    path.join(
      __dirname + "/public" + "/unwanted/info_page(1).html"
    )
  );
});
app.get("/login", (req, res) => {
  res.sendFile(
    path.join(__dirname + "/public" + "/unwanted/Login.html")
  );
});
app.get("/student", (req, res) => {
  res.sendFile(
    path.join(__dirname + "/public" + "/Student/index.html")
  );
});
app.get("/teacher", (req, res) => {
  res.sendFile(
    path.join(
      __dirname + "/public" + "/Teacher/teacher_dashboard.html"
    )
  );
});
app.get("/admin", (req, res) => {
  res.sendFile(
    path.join(
      __dirname + "/public" + "/Admin/admin_dashboard.html"
    )
  );
});

// Start server
app.listen(port, () => console.log(`Server listening on port ${port}`));
