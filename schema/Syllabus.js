const mongoose = require('mongoose')

const { Schema } = mongoose;
const syllabusSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    syllabus: {
        type: String,
        required: true
    }  
})

const Syllabus = mongoose.model('Syllabus', syllabusSchema);
module.exports = Syllabus;


