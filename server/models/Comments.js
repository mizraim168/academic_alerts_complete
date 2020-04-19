const mongoose = require('mongoose');
const { Schema } = mongoose;

const comments = new Schema({
    comment: {type:String},
    alert: [{type: Schema.ObjectId, ref: "Alerts"}],
    id_alert: {type:String}
},{
    timestamps: true
});


module.exports = mongoose.model('Comment', comments);