const ApiError = require("../error/ApiError");
const {VerificationLog} = require("../models/models");

class VerificationLogController {
    async create(req, res, next) {
        try {
            let {dateVerification, resultVerification, ItemId, VerificationCenterId} = req.body
            const verificationLog = await VerificationLog.create({
                dateVerification,
                resultVerification,
                ItemId,
                VerificationCenterId
            })

            return res.json(verificationLog)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 9
        limit = parseInt(limit)
        let offset = page * limit - limit
        let logs = await VerificationLog.findAndCountAll({limit, offset})

        return res.json(logs)
    }

    async getOne(req, res) {
        const {id} = req.params
        const log = await VerificationLog.findOne(
            {
                where: {id}
            }
        )

        return res.json(log)
    }
}

module.exports = new VerificationLogController()