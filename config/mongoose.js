
const mongoose = require('mongoose');
const env = require('./environment');

mongoose.set('strictQuery', false);

mongoose.connect(`mongodb://0.0.0.0:27017/${env.db}`);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection problem'));

db.on('open', function(){
    console.log("Connected to MongoDB Successfully")
})

module.exports = db;