const User = require("../models/user.models");
const fs = require("fs");

const created = async (data) => {
    await User.sync();
    const user = await User.create(data);
    return user;
}
const Updated = async (id, data) => {
    const user = await User.update(data, { where: { id } });
    return user;
}
const getAll = async () => {
    return await User.findAll();
}
const getById = async (id) => {
    return await User.findOne({ where: { id } });
}
const deleted = async (id) => {
    return await User.destroy({ where: { id } });
}
const updateAvatar = async (id, file) => {
    const user = await User.findOne({ where: { id } });
    if (!user) {
        throw new Error("Usuario no encontrado");
    }
    // Elimina el avatar anterior si existe
    if (user.imagePath) {
        fs.unlink(user.imagePath, (err) => {
            if (err) console.error(err);
        });
    }
    const imagePath = file.path;
    const avatar = `http://localhost:3000/images/users/avatar/${file.filename}`;
    await User.update({ avatar, imagePath }, { where: { id } });
    return { avatar, imagePath };
};


module.exports = {
    created,
    Updated,
    getAll,
    getById,
    deleted,
    updateAvatar
}
