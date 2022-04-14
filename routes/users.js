var express = require('express');
const user = require('../models/user');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//POST Sing up User
router.post('/', (req, res, next) => {
  // if(!req.body.email || !req.body.password){
  //   res.status(400).send('Username and Password required');
  //   return;
  // }

User.create({
  firstName: req.body.firstName,
  lastName: req.body.lastName,
  email: req.body.email,
  phoneNumber: req.body.phoneNumber,
  password: req.body.password
}).then(newUser =>{
  res.json(newUser);
  }).catch(() => {
    res.status(400).send();
  });
});

//POST Sign in User


//DELETE Delete User account

module.exports = router;
