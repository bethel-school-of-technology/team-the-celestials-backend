var express = require('express');
var router = express.Router();
const { Coffee } = require('../models');
/* GET all coffees*/

router.get('/', function(req, res, next) {
   Coffee.findAll().then(coffeeMenu => {
    res.json(coffeeMenu);
   })
  });

/* POST makes a new coffee*/
router.post('/', (req, res) => {
     Coffee.create ({
        nameOfCoffee: req.body.nameOfCoffee,
        ingridients: req.body.ingridients,
        price: req.body.price,
        img_url: req.body.img_url
    }).then(newCoffee => {
        res.json(newCoffee);
       }).catch((err) => {
        console.log(err);
        res.status(400).send(err);
       });
    
    // then(newCoffee => {
    //     console.log(newCoffee);
    //     res.json(newCoffee);
    // }).catch(() => {
    //     res.status(400);
    // });
});
module.exports = router;