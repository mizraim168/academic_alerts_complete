const mongoose = require('mongoose');
const { Schema } = mongoose;

const comments = new Schema({
    comment: {type:String},
    // alert: [{type: Schema.ObjectId, ref: "Alerts"}],
},{
    timestamps: true
});


module.exports = mongoose.model('Comment', comments);