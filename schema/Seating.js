const mongoose = require('mongoose');

const { Schema } = mongoose;

const seatingSchema = new Schema({
    sem: {
        type: String,
        required: true
    },
    seating: {
        type: String,
        required: true
    }
})

const Seating = mongoose.model('Seating', seatingSchema);
module.exports = Seating;