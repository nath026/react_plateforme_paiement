/* eslint-disable max-len */
const jwt = require('jsonwebtoken');
// user is log as an admin
exports.verifJWTAdmin = function verifJWTAdmin(token) {
  return new Promise((res, rej) => jwt.verify(token, process.env.JWT_SECRET_ADMIN, (err, decoded) => {
    if (err) rej(err);
    else res(decoded);
  }));
};
// user is logged as a trader confirmed
exports.verifJWTBasic = function verifJWTBasic(token) {
  return new Promise((res, rej) => jwt.verify(token, process.env.JWT_SECRET_BASIC, (err, decoded) => {
    if (err) rej(err);
    else res(decoded);
  }));
};
// user is logged but its status is still pending
exports.verifJWT = function verifJWT(token) {
  return new Promise((res, rej) => jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) rej(err);
    else res(decoded);
  }));
};

// exports.createJWT = function createJWT(user) {
//   return new Promise((res, rej) => jwt.sign(
//     user,
//     'process.env.JWT_SECRET',
//     { algorithm: 'HS512', expiresIn: 3600 },
//     (err, token) => {
//       if (err) rej(err);
//       else res(token);
//     },
//   ));
// };
exports.createJWT = function createJWT(user, role) {
  switch (role) {
    case 'ADMIN':
      return new Promise((res, rej) => jwt.sign(
        user,
        process.env.JWT_SECRET_ADMIN,
        { algorithm: 'HS512', expiresIn: 3600 },
        (err, token) => {
          if (err) rej(err);
          else res(token);
        },
      ));
    case 'BASIC':
      return new Promise((res, rej) => jwt.sign(
        user,
        process.env.JWT_SECRET_BASIC,
        { algorithm: 'HS512', expiresIn: 3600 },
        (err, token) => {
          if (err) rej(err);
          else res(token);
        },
      ));
    default:
      return new Promise((res, rej) => jwt.sign(
        user,
        process.env.JWT_SECRET,
        { algorithm: 'HS512', expiresIn: 3600 },
        (err, token) => {
          if (err) rej(err);
          else res(token);
        },
      ));
  }
};
