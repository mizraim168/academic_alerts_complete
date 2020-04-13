const mongoose = require('mongoose');
const { Schema } = mongoose;

const comments = new Schema({
    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Users'
    // },
    alert:{
        type: Schema.Types.ObjectId,
        ref: 'Alerts'
    }
},{
    timestamps: true
});


module.exports = mongoose.model('Comment', comments);