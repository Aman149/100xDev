const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRoute = require('./routes/admin');
const userRoute = require('./routes/user');
const mongoPassword = 'TltKWzTw4yECrW0W';

const app = express();

//So that we don't get cors error on frontend
app.use(cors());

//To be able to parse post requests
app.use(express.json());


app.use('/admin', adminRoute);
app.use('/users', userRoute);

mongoose.connect('mongodb+srv://admin:TltKWzTw4yECrW0W@cluster0.vhx4odw.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" });

/*
app.use(function(req, res, next) {
    res.header('Content-Type', 'application/json')
    res.header('Access-Control-Allow-Credentials', true)
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With,Content-Type, Accept'
    )
    next();
});
*/

app.listen(3000, ()=> {
    console.log('Listening on porr 3000');
})


