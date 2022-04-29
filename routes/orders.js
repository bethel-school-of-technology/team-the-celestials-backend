var express = require('express');
var router = express.Router();
var models = require("../models");
var cors = require('cors');


router.use(cors())

router.get("/", function (req, res) {
   
 
   models.User.findAll({}).then(response => {
     res.json(response)
   })
 
 });

router.post("/createOrder/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
 
  // const amidala = await User.create({ username: 'p4dm3', points: 1000 });
  // const queen = await Profile.create({ name: 'Queen' });
  // await amidala.addProfile(queen, { through: { selfGranted: false } });
  // const result = await User.findOne({
  //   where: { username: 'p4dm3' },
  //   include: Profile
  // });
  // console.log(result);

  // TODO check if coffeeIds is not empty

  user = models.User.findByPk(1).then(user => {
    console.log(user);
    models.Orders.create({user_id: user.user_id}).then(order => {
      
      req.body.coffeeIds.forEach(coffeeId => {
        models.Coffee.findByPk(coffeeId).then(coffee => {
      
          models.sequelize.query("Insert into CoffeeOrder SET coffeeCoffeeId = " + coffeeId + ", orderOrderId = " + order.order_id + ", createdAt = NOW(), updatedAt = NOW()").then(res2 => {});
          
        });
        
      });

      res.json(order);
    });
  });
  // return res.send(user);
  
    


});


module.exports = router;