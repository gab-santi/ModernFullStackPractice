// needed imports
const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const path = require('path');

// for environment
require('dotenv').config();

// express backend
const app = express();
const port = process.env.PORT || 5000;

// for CORS
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};


app.use(allowCrossDomain)
app.use(cors());
app.use(express.json());

// uri from atlas
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .catch((reason) => {
        console.log('Unable to connect to the MongoDB instance. Error: ' + reason);
    });

// connection
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Connected to MongoDB database');
})

// routing to router files
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

// reference build files
/* app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
}) */

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

// serve static assets
if (process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static('build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    });
}

app.listen(port, () => {
    console.log("Server is running on port: " + port);
});

