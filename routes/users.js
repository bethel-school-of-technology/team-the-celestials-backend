var express = require('express');
var models = require("../models");
const { User } = require('../models');
var router = express.Router();
var authService = require('../services/auth');
var cors = require('cors');
var bcrypt = require('bcrypt');
var auth = require('../services/auth');
router.use(cors()) 


//** SING UP **//
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
 
      );
    }).catch(() => {
      res.status(400).send();
    });
});

//** LOG IN **//
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
      res.status(200).send({jwt})
    }
         //iclude orders asosiation
    else {
      res.status(401).send('invalid Password')
    }
  });
});


//** UPDATE **//
router.put('/updateProfile', async (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");

  //Get token from the request
const header = req.headers.authorization;

if (!header) {
  res.status(403).send();
  return;
}
const token = header.split(' ')[1];

  //validate token / get the user
 const User = await auth.verifyUser(token);
 
 if (!User) {
  res.status(403).send();
  return;
 }

  //update user with the user id

  User.update({
    
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
  }).then(() => {
    res.json({User});
  }).catch((err) => {
    res.send({
      error: err,
      status: res.status(400),
    })
  })
});



//** DELTE **/
router.delete('/delete', async (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  //Get token from the request
const header = req.headers.authorization;

if (!header) {
  res.status(403).send();
  return;
}
const token = header.split(' ')[1];

  //validate token / get the user
 const User = await auth.verifyUser(token);
 
 if (!User) {
  res.status(403).send();
  return;
 }
 const user_id = User.user_id
  //Delete user

  User.destroy({
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
