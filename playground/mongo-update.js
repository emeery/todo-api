const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp', (err, db) => {
    if(err) { return console.log('no se puede conectar con mongo'); }
    console.log('conectado con mongo');
    // filter, 
    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5bee2a5f5b22b31f67d330f5')
    // },{
    //     $set: {completado: true}
    // },{
    //     returnOriginal: false
    // }).then(res => { console.log(res); })
    db.collection('Usuarios').findOneAndUpdate({
        _id: new ObjectID('5bee17abe7316a1e8057397f')
    },{
        $set: {nombre: 'Gerardo'},
        $inc: {edad: 2 }
    },{
        returnOriginal: false
    }).then(res => { console.log(res); })
    // db.close();
});