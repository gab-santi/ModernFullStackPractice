// import for routing
const router = require('express').Router();
let User = require('../models/user.model');

// route for root url
router.route('/').get((req, res) => {
    User.find() // method that gets a list of all Users in the db
        .then(users => res.json(users)) // return json of all Users
        .catch(err => res.status(400).json('Error: ' + err));
});

// add user route, post request
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const newUser = new User({username});

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;