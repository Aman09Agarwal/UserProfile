const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ScheduleSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    Image: {
        type: String,
        required: true
    },
    address: {
        type: String
    }
});

module.exports = mongoose.model('userdetails', ScheduleSchema);