const { Sequelize } = require("sequelize");
const config = require("../config");

const sequelize = new Sequelize(
config.mysql.database,
config.mysql.user,
config.mysql.password,
{
    host: config.mysql.host,
    dialect: "mysql",
    port: config.mysql.host,
}
);

module.exports = sequelize;