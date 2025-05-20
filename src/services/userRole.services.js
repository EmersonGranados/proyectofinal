const Role = require("../models/role.models");
const User = require("../models/user.models");
const UserRole = require("../models/userRole.models");

const created = async (data) => {
    await UserRole.sync();
    const userRole = await UserRole.create(data);
    return userRole;
}
const Updated = async (user_id,role_id, data) => {
    const userRole = await UserRole.update(data, {where: {user_id,role_id}});
    return userRole;
}
const getAll = async () => {
    return await UserRole.findAll(
        {include: [
            {model: User, as: 'urUser'},
            {model: Role, as: 'urRole'}
        ]}
    );
}
const getById = async (user_id,role_id) => {
    return await UserRole.findOne(
        {where: {user_id,role_id}},
        {include: [
            {model: User, as: 'urUser'},
            {model: Role, as: 'urRole'}
        ]}
    );
}

const deleted = async (user_id,role_id) => {
    return await UserRole.destroy({where: {user_id,role_id}});
}

module.exports = {
    created,
    Updated,
    getAll,
    getById,
    deleted
}