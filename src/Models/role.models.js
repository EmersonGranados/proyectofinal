const {DataTypes } = require("sequelize");
const sequelize = require("../db/db");


const Role = sequelize.define(
"Role",
{
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: {
        notNull: { msg: "name is required" },
        },
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}

);
// Role.hasMany(userRole, {
//     foreignKey: "role_id",
//     sourceKey: "id",
//     as: "urRole",
// });

// userRole.belongsTo(Role, {
//     foreignKey: "role_id",
//     targetKey: "id",
//     as: "urRole",
// });

module.exports = Role;