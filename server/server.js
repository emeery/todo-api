var express = require('express'); 
var parser = require('body-parser'); 

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./model/todo');


var app = express();
app.use(parser.json());
app.post('/todos', (req, res, next) => {
    var todo = new Todo({
        tarea: req.body.tarea
    });
    todo.save().then((doc) => {
        res.send(doc);
    },e => { res.status(400).send(e); });
});
app.get('/todos', (req, res, next) => {
    
    Todo.find().then(todos => {
        res.send({todos});
    },e => { res.status(400).send(e); })
});
app.listen(3000, () => {
    console.log('puerto 3000!');
});
module.exports = {app};
