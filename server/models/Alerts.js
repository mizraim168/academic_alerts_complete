const mongoose = require('mongoose');
const { Schema } = mongoose;

const alerts = new Schema({
    matricula: { type: Number, required: true },
    student_name: { type: String, required: false },
    educational_program: { type: String, required: true },  
    incidence: { type: String, required: true },
    tracing: { type: String, required: true },
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Alerts', alerts);