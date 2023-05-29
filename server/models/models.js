const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('User', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Item = sequelize.define('Item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    serialNumber: {type: DataTypes.INTEGER,  allowNull: false},
    dateLastVerification: {type: DataTypes.DATE,  allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
})

const VerificationLog = sequelize.define('Verification_Log', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    dateVerification: {type: DataTypes.DATE,  allowNull: false},
    resultVerification: {type: DataTypes.STRING, allowNull: false},
})

const VerificationCenter = sequelize.define('Verification_Center', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    address: {type: DataTypes.STRING, allowNull: false},
    contacts: {type: DataTypes.STRING, allowNull: false},
})


Type.hasMany(Item)
Item.belongsTo(Type)

Item.hasMany(VerificationLog)
VerificationLog.belongsTo(Item)

VerificationCenter.hasMany(VerificationLog)
VerificationLog.belongsTo(VerificationCenter)


module.exports = {
    User,
    Type,
    Item,
    VerificationLog,
    VerificationCenter
}