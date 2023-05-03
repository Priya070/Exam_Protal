const mongoose = require('mongoose');
const { Schema } = mongoose;

const registerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    rollNo: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true
    },
    receipt: {
        type: String,
        required: true
    }
})

const Backpaper = mongoose.model('Backpaper', registerSchema);
module.exports = Backpaper;