const Router = require('express')
const router = new Router()
const VerificationCenterController = require("../controllers/VerificationCenterController");

router.post('/', VerificationCenterController.create)
router.get('/', VerificationCenterController.getAll)
router.get('/:id', VerificationCenterController.getOne)

module.exports = router