const { verifJWT } = require('../lib/security');

function verifyAuthorization(req, res, next) {
  const authorization = req.headers.Authorization ?? req.headers.authorization;
  if (!authorization) {
    res.sendStatus(401);
    return;
  }
  const [type, token] = authorization.split(/\s+/);
  if (!['Basic', 'Bearer'].includes(type)) {
    res.sendStatus(401);
    return;
  }
  // eslint-disable-next-line default-case
  switch (type) {
    case 'Basic':
      /// ...
      // validCredentials(token)
      //  .then(credentials => {req.merchant = credentials.merchant; next();})
      //  .catch(()=> res.sendStatus(401));
      break;
    case 'Bearer':
      verifJWT(token)
        .then((user) => {
          // Load user from db
          req.user = user;
          req.merchant = user.merchant;
          next();
        })
        .catch(() => res.sendStatus(401));
      break;
  }
}

const authRole = (permission) => (req, res, next) => {
  const userRole = req.body.role;
  if (userRole === 'PENDING') {
    return res.status(200).json('Your status is still being verified');
  } if (permission.includes(userRole)) {
    next();
  } else {
    return res.status(401).json('No permission');
  }
};

module.exports = {
  authRole,
  verifyAuthorization,

};
