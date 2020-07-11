// CRUD - create, read, update, delete

// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

// destructuring
const { MongoClient, ObjectID } = require('mongodb');

// url from the db server running in the terminal
// do not close the server
const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'taskManager';

// not really necessary to create object ids since mongodb can do it on its own
// const id = new ObjectID();
// console.log(id);
// console.log(id.getTimestamp());

MongoClient.connect(connectionURL, { userNewUrlParser: true }, (error, client) => {
    // asynchronous operation
    if(error) {
        return console.log('unable to connect to database');
    }

    console.log('connected to database');

    // returns database reference
    const db = client.db(databaseName);

    // collection -> table
    // document -> row
    // field -> column

    // CREATE
    // this creates a new table and this can be verified in the Robo3T GUI
    // insertOne inserts a single document
    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'jkl',
    //     age: 41
    // }, (error, result) => {
    //     if(error) {
    //         return console.log('unable to insert user');
    //     }

    //     console.log(result.ops);
    // });

    // bulk insert
    // db.collection('users').insertMany([
    //     {
    //         name: 'def',
    //         age: 21
    //     }, {
    //         name: 'ghi',
    //         age: 31
    //     }
    // ], (error, result) => {
    //     if(error) {
    //         return console.log('unable to insert documents!');
    //     }
    //     console.log(result.ops);
    // });

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'wash clothes',
    //         completed: true
    //     }, {
    //         description: 'study mongo',
    //         completed: true
    //     }, {
    //         description: 'play games',
    //         completed: false
    //     }
    // ], (error, result) => {
    //     if(error) {
    //         return console.log('unable to insert documents');
    //     }
    //     console.log(result.ops);
    // })


    // READ
    // to find one document
    // db.collection('users').findOne({ _id: new ObjectID("5eff3f9756157220cdecd6bb") }, (error, user) => {
    //     if(error) {
    //         return console.log('unable to fetch');
    //     }
    //     console.log(user);
    // });

    // to find many documents
    // db.collection('tasks').find({ completed: true }).toArray((error, task) => {
    //     if(error) {
    //         return console.log('unable to fetch');
    //     }
    //     console.log(task);
    // });
    // db.collection('tasks').find({ completed: true }).count((error, count) => {
    //     if(error) {
    //         return console.log('unable to fetch');
    //     }
    //     console.log(count);
    // });


    // UPDATE
    // promise
    // db.collection('users').updateOne({ 
    //     _id: new ObjectID("5eff38dc9ba1cb205ed4f050")
    // }, {
    //     // $set: {
    //     //     name: 'xyz'
    //     // },
    //     $inc: {
    //         age: 1
    //     }
    // }).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // });

    // db.collection('tasks').updateMany({
    //     completed: false
    // },{
    //     $set: {
    //         completed: true
    //     } 
    // }).then((result) => {
    //     console.log(result);
    //     console.log(result.modifiedCount);
    // }).catch((error) => {
    //     console.log(error);
    // });


    // DELETE
    // db.collection('users').deleteMany({
    //     age: 11
    // }).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // });

    // db.collection('tasks').deleteOne({
    //     description: 'wash clothes'
    // }).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // });

});