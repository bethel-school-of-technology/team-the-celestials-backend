const jwt = require('jsonwebtoken');
const models = require('../models');

var authService = {
  signUser: function(user) {
    const token = jwt.sign(
      {
        Email: user.email,
        UserId: user.user_Id
      },
      'secretkey',
      {
        expiresIn: '1h'
      }
    );
    return token;
  }
}

module.exports = authService;
