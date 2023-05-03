const mongoose = require('mongoose');
const { Schema } = mongoose;

const scheduleSchema = new Schema({
    sem: {
        type: String
    },
    schedule: {
        type: String,
        required: true
    }
})

const Schedule = mongoose.model('Schedule', scheduleSchema);
module.exports = Schedule;