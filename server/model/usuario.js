const mongoose = require('mongoose');
var Usuario = mongoose.model('Usuario', {
    email: {type: String, required: true, trim: true, minlength: 1},
});
module.exports = {Usuario};