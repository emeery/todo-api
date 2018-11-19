var express = require('express'); 
var parser = require('body-parser');
var {mongoose} = require('./db/mongoose'); 
var {Todo} = require('./model/todo');
const {ObjectID} = require('mongodb');

var app = express();
const puerto = process.env.PORT || 3000;

app.use(parser.json());
app.post('/todos', (req, res, next) => {
    var todo = new Todo({
        tarea: req.body.tarea
    });
    // console.log(todo);
    todo.save().then((doc) => {
        res.send(doc);
    },e => { res.status(400).send(e); });
});
app.get('/todos', (req, res, next) => {
    Todo.find().then(todos => {
        res.send({todos});
    },e => { res.status(400).send(e); })
});
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)) { 
        return res.status(404).send();  
    }
    Todo.findById(id).then(todo => { 
        if(!todo) { return res.status(404).send(); }
        res.send({todo});
    }).catch(e => { res.status(400).send(e) });
});
app.listen(puerto, () => {
    console.log(`puerto: ${puerto}`);
});
module.exports = {app};
