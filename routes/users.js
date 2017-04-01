const router = require('express').Router()
const UserController = require('../controllers').UserController

const ID_PARAM = 'id'
const ID_PATH = `/:${ID_PARAM}(\\d+)`

router.use(UserController.retrievePassword)
router.get('/', UserController.getAll)
router.post('/', UserController.create)
router.get(ID_PATH, UserController.getOne)
router.patch(ID_PATH, UserController.merge)
router.put(ID_PATH, UserController.update)
router.delete(ID_PATH, UserController.destroy)

module.exports = router
