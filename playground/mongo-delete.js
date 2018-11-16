const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp', (err, db) => {
    if(err) { return console.log('no se puede conectar con mongo'); }
    console.log('conectado con mongo');
    // deleteMany, deleteOne
    // db.collection('Todos').findOneAndDelete({completado: false}).then(res => {
    //     console.log(res);
    // });
    db.collection('Usuarios').deleteMany({nombre: 'Gerardo'});
    db.collection('Usuarios').findOneAndDelete({
        _id: new ObjectID('5bee14b9dbf8f933f4a4432a')
    });
    // db.close();
});