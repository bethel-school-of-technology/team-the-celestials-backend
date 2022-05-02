var express = require('express');
var router = express.Router();
var models = require("../models");
var cors = require('cors');
var authService = require('../services/auth');
var auth = require('../services/auth');


router.use(cors())

/*GET ORDER HISTORY using user ID from tokennpm */
router.get("/orderHistory", async (req, res) => {

  //Get token from the request//
  const header = req.headers.authorization;
  if (!header) {
    res.status(403).send();
    return;
  }
  const token = header.split(' ')[1];

//validate token / get the user
  const usr = await auth.verifyUser(token)
  
  var uid = usr.user_id;
  const result = await models.Orders
    .findAll(
      { where: { 
        user_id: uid
      }
    })
    .then(response =>{
      res.json(response);
    });


});

/*CREATE ORDER Using User ID From token*/
router.post("/createOrder", async (req, res) => {

  // TODO check if coffeeIds is not empty

  //Get token from the request//
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
console.log(User)

const user_id = User.user_id
//Make order

  models.Orders.create({
    where: {
      user_id: user_id
    }, 
    include: 'CoffeeOder'
  }).then(() => {
    res.status(200).send({ });
  }).catch(() => {
    res.status(400).send();
  });
});
//   user = models.User.findByPk(user_id).then(user => {
//     console.log(user);
//     models.Orders.create({ user_id: user.user_id }).then(order => {

//       req.body.coffeeIds.forEach(coffeeId => {
//         models.Coffee.findByPk(coffeeId).then(coffee => {

//           models.sequelize.query(
//             "Insert into CoffeeOrder SET coffeeCoffeeId = " + coffeeId + 
//             ", orderOrderId = " + order.order_id + 
//             ", createdAt = NOW(), updatedAt = NOW()"
//             ).then(res2 => { });

//         });

//       });

//       res.json(order);
//     });
//   });
//   return res.send(user);

// });


module.exports = router;