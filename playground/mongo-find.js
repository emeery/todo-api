const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp', (err, db) => {
    if(err) { return console.log('no se puede conectar con mongo'); }
    console.log('conectado con mongo');
    // db.collection('Todos').find({
    //     new ObjectID('123abc')
    // }).toArray()
    // .then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('no se puede conectar con mongo');
    // });
    // db.collection('Todos').find().count()
    // .then( count => {
    //     console.log(`Todos contiene ${count} documentos`);
    // }, (err) => {
    //     console.log('no se puede conectar con mongo');
    // });
    db.collection('Usuarios').find({
        nombre: 'Gerardo'
    }).toArray()
    .then( docs => {
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('no se puede conectar con mongo');
    });
    // db.close();
});