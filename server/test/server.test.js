const request = require('supertest');
const expect = require('expect');

const {app} = require('./../server');
const {Todo} = require('./../model/todo');
// elimina todos los items del todo antes del test
const todos = [{tarea: 'primer test todo'}, {tarea: 'segundo test todo'}];
beforeEach(done => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});
describe('post /todos', () => {
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

describe('get /todos', () => {
    it('deberia obtener todos', (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=> {
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    });
});