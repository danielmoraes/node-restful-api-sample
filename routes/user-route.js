const express = require('express')
const UserCtrl = require('../controllers').UserCtrl

const router = express.Router()

router.route('/')
  /** GET /api/users - Get list of users */
  .get(UserCtrl.retrieveOptions, UserCtrl.list)

  /** POST /api/users - Create new user */
  .post(UserCtrl.retrievePassword, UserCtrl.retrieveData, UserCtrl.create)

/** Load user when userId route parameter is hit */
router.param('userId', UserCtrl.retrieveEntity)

router.route('/:userId')
  /** GET /api/users/:userId - Get user */
  .get(UserCtrl.get)

  /** PATCH /api/users/:userId - Merge user */
  .patch(UserCtrl.retrieveData, UserCtrl.merge)

  /** PUT /api/users/:userId - Update user */
  .put(UserCtrl.retrieveData, UserCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(UserCtrl.remove)

module.exports = router
