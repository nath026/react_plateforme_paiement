require('dotenv').config();
/* eslint-disable max-len */
const jwt = require('jsonwebtoken');

exports.verifJWT = function verifJWT(token) {
  return new Promise((res, rej) => jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) rej(err);
    else res(decoded);
  }));
};

exports.createJWT = function createJWT(user) {
  return new Promise((res, rej) => jwt.sign(
    user,
    process.env.JWT_SECRET,
    { algorithm: 'HS512', expiresIn: 3600 },
    (err, token) => {
      if (err) rej(err);
      else res(token);
    },
  ));
};
