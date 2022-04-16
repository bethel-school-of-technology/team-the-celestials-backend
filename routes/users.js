var express = require('express');

var router = express.Router();
var models = require("../models");


// GET signup
// router.get('/', function (req, res, next) {
//   res.render('/');
// });
// POST signup
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

  // models.User
  //   .findOrCreate({
  //     where: {
  //       firstName: req.body.firstName
  //     },
  //     defaults: {
  //       firstName: req.body.firstName,
  //       lastName: req.body.lastName,
  //       email: req.body.email,
  //       phoneNumber:req.body.email,
  //       password: req.body.password,

  //     }
  //   }).spread(function (result, created) {
  //     if (created) {
  //       res.redirect('logged In');
  //     } else {
  //       res.send('This user already exists')
  //     }
  //   });
});


router.get("/", function (req, res) {

  models.User.findAll({}).then(response => {
    res.json(response)
  })

})

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
