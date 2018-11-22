const mongoose = require('mongoose');
var Todo = mongoose.model('Todo', {
    tarea: {type: String, required: true, trim: true, minlength: 3},
    completado: {type: Boolean, default: false},
    completadoEn: {type: Number, default: null}
});
module.exports = {Todo};