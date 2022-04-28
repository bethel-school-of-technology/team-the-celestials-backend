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
 

    


});


module.exports = router;