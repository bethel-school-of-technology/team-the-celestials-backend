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
router.post('/', (req, res, next) => {
    Coffee.create ({
        nameOfCoffee: req.body.nameOfCoffee,
        ingridients: req.body.ingridients,
        price: req.body.price,
        img_url: req.body.img_url
    }).then(newCoffee => {
        res.json(newCoffee);
    }).catch(() => {
        res.status(400);
    });
});
module.exports = router;