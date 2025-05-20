const Role = require("../models/role.models");

const created = async (data) => {
    await Role.sync();
    const role = await Role.create(data);
    return role;
}
const Updated = async (id, data) => {
    const role = await Role.update(data, { where: { id } });
    return role;
}
const getAll = async () => {
    return await Role.findAll();
}
const getById = async (id) => {
    return await Role.findOne({ where: { id } });
}
const deleted = async (id) => {
    return await Role.destroy({ where: { id } });
}

module.exports = {
    created,
    Updated,
    getAll,
    getById,
    deleted
}
