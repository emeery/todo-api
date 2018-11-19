const {ObjectId} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/model/todo');
const {Usuario} = require('./../server/model/usuario');

// Todo.remove({}).then(res => {
//     console.log(res);
// });
Todo.findByIdAndRemove('5bf2772e5b22b31f67d3b913').then(todo => {
    console.log(todo);
});