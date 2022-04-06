var express = require('express');
var router = express.Router();
const mysql = require('mysql2')


//created route for mysql2 UIR
var connection = mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Password1!',
  database: 'sakila'
});

connection.connect(function(err) {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log('We are connected to database');
})


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
