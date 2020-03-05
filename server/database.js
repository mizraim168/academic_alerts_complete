const mongoose = require('mongoose');

const URI = 'mongodb://localhost/academic_alerts';

mongoose.connect(URI)
    .then(db => console.log("DB is conected"))
    .catch(err => console.error(err))
module.exports = mongoose;