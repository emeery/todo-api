const _ = require('lodash');
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
app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    console.log(id);
    if(!ObjectID.isValid(id)) { 
        return res.status(404).send();  
    }
    Todo.findByIdAndRemove(id).then(todo => { 
        if(!todo) { return res.status(404).send(); }
        res.send({todo});
    }).catch(e => { res.status(400).send(e) });
});
app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['tarea', 'completado']);
    if(!ObjectID.isValid(id)) { 
        return res.status(404).send();  
    }
    if(_.isBoolean(body.completado) && body.completado) {
        body.completadoEn = new Date().getTime();
    } else {
        body.completado = false;
        body.completadoEn = null;
    }
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true})
    .then(todo => {
        if(!todo) { res.status(404).send(); }
        res.send({todo});
    }).catch(e => res.status(404).send());
});

app.listen(puerto, () => {
    console.log(`puerto: ${puerto}`);
});
module.exports = {app};
