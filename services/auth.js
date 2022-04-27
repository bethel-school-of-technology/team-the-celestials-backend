const jwt = require('jsonwebtoken');
const models = require('../models');

const secreteKey = 'celestials';


module.exports = {
  createJWT: (user) => {
    const token = jwt.sign({
      email: user.email,
      id: user.user_id
    },
    secreteKey, {
      expiresIn: '1h'
    });
    return token;
  },
  verifyUser: () => {}
};
