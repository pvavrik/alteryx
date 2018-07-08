import express from 'express';

import utils from '../helpers/utils';
import config from '../config/dev';

import jwt from 'jsonwebtoken';

import users from '../users';

const routes  = express.Router();
const privateKey = config.key.privateKey;
const tokenExpireInMinutes = config.key.tokenExpireInMinutes;

routes.use(utils.setHeadersForCORS);

/* */
routes.route('/registration').post((req, res) => {
  const user = users.add(req.body);
  if (user) {
    utils.sendCreated(res, user);
  } else {
    utils.sendBadRequest(res, 'Not created');
  }
});
routes.route('/authenticate').post((req, res) => {
  const user = users.findByEmail(req.body.email);
  if (!user) {
    return utils.sendUnauthorized(res, 'Authentication failed')
  }
  if (!users.verifyPassword(user, req.body.password)) {
    return utils.sendUnauthorized(res, 'Authentication failed');
  }
  const token = jwt.sign(
    { id: user.id, email: user.email },
    privateKey,
    { expiresIn: tokenExpireInMinutes}
  );
  res.json({
    success: true,
    message: 'Token created',
    token
  });
});
routes.route('/logout').post((req, res) => {
  res.send(200);
});

/* users */
routes.route('/users')
  .all(utils.verifyToken)
  .get((req, res) => { res.json(users.getAll()); });

routes.route('/user/:id')
  .all(utils.verifyToken)
  .get((req, res) => {
    const user = users.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      utils.sendNotFound(res);
    }
  })
  .put((req, res) => {
    const user = users.update(req.params.id, req.body);
    if (user) {
      res.json(user);
    } else {
      utils.sendNotFound(res);
    }
  })
  .delete((req, res) => {
    const user = users.delete(req.params.id);
    if (user) {
      utils.sendDeleted(res);
    } else {
      utils.sendNotFound(res);
    }
  });

module.exports = routes;
