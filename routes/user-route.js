const express = require('express')
const UserCtrl = require('../controllers').UserCtrl

const router = express.Router();

router.route('/')
  /** GET /api/users - Get list of users */
  .get(UserCtrl.list)

  /** POST /api/users - Create new user */
  .post(UserCtrl.create);

router.route('/:userId')
  /** GET /api/users/:userId - Get user */
  .get(UserCtrl.get)

  /** PATCH /api/users/:userId - Merge user */
  .patch(UserCtrl.merge)

  /** PUT /api/users/:userId - Update user */
  .put(UserCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(UserCtrl.remove)

/** Load user when API with userId route parameter is hit */
router.param('userId', UserCtrl.load);

module.exports = router
