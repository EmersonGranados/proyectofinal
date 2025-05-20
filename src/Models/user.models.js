const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");


const User = sequelize.define(
"User",
{
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    first_name: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
        notNull: { msg: "first name is required" },
        },
    },
    last_name: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
        notNull: { msg: "last name is required" },
        },
    },
    username: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: {
        notNull: { msg: "username is required" },
        },
    },
    telephone: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
        notNull: { msg: "telephone is required" },
        },
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: {
        isEmail: true,
        notNull: { msg: "email is required" },
        },
    },
    avatar: {
        type: DataTypes.TEXT,
        defaultValue: "http://localhost:3000/images/users/avatar/avatar.wepb",
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
},

);


module.exports = User;