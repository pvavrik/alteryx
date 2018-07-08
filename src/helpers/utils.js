import jwt from 'jsonwebtoken';

exports.sendCreated = function(res, data) {
  return res.status(201).send(data);
};

exports.sendDeleted = function(res, data) {
  return res.status(204).send();
};

exports.sendBadRequest = function(res, message) {
  return res.status(400).send({
    success: false,
    message: message
  });
};

exports.sendUnauthorized = function(res, message) {
  return res.status(401).send({
    success: false,
    message: message
  });
};

exports.sendNotFound = function(res) {
  return res.status(404).send({
    success: false,
    message: 'Resource not found.'
  });
};

exports.setHeadersForCORS = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-Access-Token, Content-Type, Accept");
  next();
};

exports.verifyToken = function(req, res, next) {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    return this.sendUnauthorized(res, 'No token provided.');
  }
  jwt.verify(token, privateKey, function(err, decoded) {
    if (err) {
      return this.sendUnauthorized(res, 'Failed to authenticate token.');
    }
    const user = users.findById(decoded.id);

    if (!user) {
      return this.sendUnauthorized(res, 'Failed to authenticate token.');
    }
    req.currentUser = user;
    next();
  });
};
