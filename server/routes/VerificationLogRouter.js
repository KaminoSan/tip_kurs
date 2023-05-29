const Router = require('express')
const router = new Router()
const verificationLogController = require('../controllers/VerificationLogController')

router.post('/', verificationLogController.create)
router.get('/', verificationLogController.getAll)
router.get('/:id', verificationLogController.getOne)

module.exports = router