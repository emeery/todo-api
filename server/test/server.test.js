const request = require('supertest');
const expect = require('expect');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../model/todo');
// elimina todos los items del todo antes del test
const todos = [{
    _id: new ObjectID(), 
    tarea: 'primer test todo'
}, {
    _id: new ObjectID(),
    tarea: 'segundo test todo'
}];
beforeEach(done => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});
describe('POST /todos', () => {
    it('deberia crear un todo', (done) => {
        var tarea = 'test todo';
        request(app)
        .post('/todos')
        .send({tarea})
        .expect(200)
        .expect((res)=> {
            expect(res.body.tarea).toBe(tarea);
        })
        .end((err, res)=> {
            if(err) { return done(err); }
            Todo.find({tarea}).then(todos => {
                expect(todos.length).toBe(1);
                expect(todos[0].tarea).toBe(tarea);
                done();
            }).catch(e => done(e));
        });
    });
    it('no crea un todo con datos invalidos', (done) => {
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res)=> {
            if(err) { return done(err); }
            
            Todo.find().then(todos => {
                expect(todos.length).toBe(2);
                done();
            }).catch(e => done(e));
        });
    });
});

describe('GET /todos', () => {
    it('deberia obtener todos', (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=> {
            expect(res.body.todos.length).toBe(2);
        })
        .end(done)
    });
});

describe('GET /todos/:id', () => {
    it('debería retornar un documento', (done) => {
        request(app)
          .get(`/todos/${todos[0]._id.toHexString()}`)
          .expect(200)
          .expect((res) => {
            //   console.log(res.body.todo);
            expect(res.body.todo.tarea).toBe(todos[0].tarea);
          })
          .end(done);
    });
    it('deberia retornar 404 si no hay todo', (done) => {
        var hexId = new ObjectID().toHexString();
        request(app)
          .get(`/todos/${hexId}`)
          .expect(404)
          .end(done)
    });
    it('deberia retornar 404 si no hay un id tipo ObjectID', (done) => {
        request(app)
          .get('/todos/123abc')
          .expect(404)
          .end(done)
    });
});