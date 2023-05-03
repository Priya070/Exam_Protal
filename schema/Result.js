const mongoose = require("mongoose");

const { Schema } = mongoose;
const resultSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  roll_no: {
    type: String,
    required: true,
  },
  subjects: {
    type: {},
    required: true,
  },
});

const Result = mongoose.model("Result", resultSchema);
module.exports = Result;
