// require the library
const mongoose =require('mongoose');
mongoose.connect('mongodb://localhost/contact_list_db')

//connect to the db
const db=mongoose.connection;

// acquire the connection and error
db.on('error',console.error.bind(console,'error connection db'));


// up and running
db.once('open',function(){
    console.log('successfully connected with the database!!');
})