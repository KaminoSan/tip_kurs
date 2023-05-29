const ApiError = require ("../error/ApiError");
const {VerificationCenter} = require("../models/models");

class VerificationCenterController {
    async create(req, res, next) {
        try {
            let {name, address, contacts} = req.body
            const verificationLog = await VerificationCenter.create({name, address, contacts})

            return res.json(verificationLog)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {

        let centers = await VerificationCenter.findAll()

        return res.json(centers)
    }

    async getOne(req, res) {
        const {id} = req.params
        const center = await VerificationCenter.findOne(
            {
                where: {id}
            }
        )

        return res.json(center)
    }
}

module.exports = new VerificationCenterController()