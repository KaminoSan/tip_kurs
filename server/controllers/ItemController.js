const uuid = require('uuid')
const path = require('path');
const {Item} = require('../models/models')
const ApiError = require('../error/ApiError');

class ItemController {
    async create(req, res, next) {
        try {
            let {name, serialNumber, dateLastVerification, typeId} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const item = await Item.create({name, serialNumber, dateLastVerification, typeId, img: fileName});

            return res.json(item)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
        let {typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        limit = parseInt(limit)
        let offset = page * limit - limit
        let devices;
        if (!typeId) {
            devices = await Item.findAndCountAll({limit, offset})
        }
        if (typeId) {
            devices = await Item.findAndCountAll({where:{typeId}, limit, offset})
        }
        return res.json(devices)
    }

    async getOne(req, res) {
        const {id} = req.params
        const item = await Item.findOne(
            {
                where: {id},
            },
        )
        return res.json(item)
    }
}

module.exports = new ItemController()
