const Router = require('express')
const router = new Router()
const deviceRouter = require('./ItemRouter')
const userRouter = require('./userRouter')
const typeRouter = require('./typeRouter')
const verificationLogsRouter = require('./VerificationLogRouter')
const verificationCenterRouter = require('./VerificationCenterRouter')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/device', deviceRouter)
router.use('/log', verificationLogsRouter)
router.use('/center', verificationCenterRouter)

module.exports = router