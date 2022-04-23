var express = require('express');

var router = express.Router();
var models = require("../models");
var cors = require('cors');

router.use(cors()) 



// POST signup UIR
router.post('/', function (req, res, next) {

  // let parsedNum = parseInt(req.body.)

  models.User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
  }).then(response => {
    res.json(response)
  }).catch(error => {
    console.log(error)
  })
});


//To connect with front in case localhost3000 does not work UIR
router.get("/", function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");

  models.User.findAll({}).then(response => {
    res.json(response)
  })

});

//POST Sign in User UIR
router.get('/getOne', function (req, res, next) {
  models.user
    .findOne({
      where: {
        email: req.body.email,
        password: req.body.password
      }
    })
    .then(User => {
      if (User) {
        res.send('Welcome!');
      } else {
        res.send('Wrong Password!');
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
