// const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/model/todo');
const {Usuario} = require('./../server/model/usuario');

var id = '5bef406e8b98c2fc4559e931';
Todo.findById(id).then(todo => {
    if (todo) {
        console.log(JSON.stringify(todo, undefined, 2));
    }
}).catch(e => console.log(e));

Usuario.findById('5bee84c765841e482d3dff50').then((user) => {
    if (!user) {
        return console.log('no se puede encontrar el usuario');
    }
    console.log(JSON.stringify(user, undefined, 2));
}, (e) => {
    console.log(e); 
})