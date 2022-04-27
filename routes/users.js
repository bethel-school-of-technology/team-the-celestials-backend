var express = require('express');
var models = require("../models");
const { User } = require('../models');
var router = express.Router();
var authService = require('../services/auth');
var cors = require('cors');
var bcrypt = require('bcrypt');
const auth = require('../services/auth');
router.use(cors()) 


// SIGNUP a new user
router.post('/signup', async (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");

  if (!req.body.email || !req.body.password) {
    res.status(400).render('error');
    return;
  }
//hash Password
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(req.body.password, salt);

    User.create({
       // user_id: req.body.user_id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: hashedPassword
    }).then(newUser => {
      res.json({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber
      }
      //iclude orders asosiation
      );
    }).catch(() => {
      res.status(400).send();
    });
});

// Login user and return JWT as cookie
router.post('/login', async (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then( async user => {
  //check if user exists
    if (!user) {
      res.status(404).send('Invalid username');
      return;
    }
  // check password
    const valid = await bcrypt.compare(req.body.password, user.password);
    if (valid){
      //Create token
      const jwt = auth.createJWT(user);
      res.status(200).send('Hi ' + user.firstName)
    }else {
      res.status(401).send('invalid Password')
    }
  });
});


//Update user account  UIR
router.put('/:id', function (req, res, next) {
  const user_id = parseInt(req.params.id);

  // if (!user_id || user_id <= 0) {
  //   res.status(400).send('Invalid User');
  //   return;
  // }

  models.User.update({
    user_id: req.body.user_id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
  },{
    where: {
      user_id: user_id
    }
  }).then(() => {
    res.status(204).send("Updated Completed :)");
  }).catch((err) => {
    res.send({
      error: err,
      status: res.status(400),
      message: "update did not work lol"
    })
  })
});



//DELETE Delete User account
router.delete('/:id', (req, res, next) => {
  const user_id = parseInt(req.params.id);

  if (!user_id || user_id <= 0) {
    res.status(400).send('Invalid User');
    return;
  }

  models.User.destroy({
    where: {
      user_id: user_id
    }
  }).then(() => {
    res.status(204).send();
  }).catch(() => {
    res.status(400).send();
  });
});

module.exports = router;
