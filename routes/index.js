var express = require('express');
var router = express.Router();
var cors = require('cors');


router.use(cors()) 

//router.get("/", function (req, res) {
  //res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");

  //models.User.findAll({}).then(response => {
    //res.json(response)
  //})

//});



router.post('/test', function(req, res, next) {
  console.log(req.body);

  res.send(req.body)
});

module.exports = router;
