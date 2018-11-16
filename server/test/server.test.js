const request = require('supertest');
const expect = require('expect');

const {app} = require('./../server');
const {Todo} = require('./../model/todo');
// elimina todos los items del todo antes del test
beforeEach(done => {
    Todo.remove({}).then(() => done());
});
describe('post /', () => {
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
            Todo.find().then(todos => {
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
                expect(todos.length).toBe(0);
                done();
            }).catch(e => done(e));
        });
    });
});
