const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp', (err, db) => {
    if(err) { return console.log('no se puede conectar con mongo'); }
    console.log('conectado con mongo');
    // // db.collection('Todos').insertOne({
    // //     texto: 'algo que hacer',
    // //     completado: false
    // // }, (err, resultado) => {
    // //     if(err) { return console.log('no se pueden insertar datos', err); }
    // //     console.log(JSON.stringify(resultado.ops, undefined, 2));
    // // });
    // // db.close();
    // db.collection('Usuarios').insertOne({
    //     nombre: 'Carlos',
    //     edad: 26,
    //     locacion: 'Ciudad de México'
    // }, (err, resultado) => {
    //     if(err) { return console.log('no se pueden insertar datos', err); }
    //     console.log(resultado.ops);
    // });
    db.close();
});
