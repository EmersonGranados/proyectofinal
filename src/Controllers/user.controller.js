const { successResponse, errorResponse } = require('../utils/response');
const userService = require('../services/user.services');

const create = async (req, res) => {
    try {
        const user = await userService.created(req.body);
        return successResponse(req, res, user, 201);
    } catch (error) {
        return errorResponse(req, res, error.message, 500);
    }
};

const getAll = async (req, res) => {
    try {
        const users = await userService.getAll();
        return successResponse(req, res, users, 200);
    } catch (error) {
        return errorResponse(req, res, error.message, 500);
    }
};

const getById = async (req, res) => {
    try {
        const user = await userService.getById(req.params.id);
        if (!user) {
            return errorResponse(req, res, "Usuario no encontrado", 404);
        }
        return successResponse(req, res, user, 200);
    } catch (error) {
        return errorResponse(req, res, error.message, 500);
    }
};

const update = async (req, res) => {
    try {
        const user = await userService.Updated(req.params.id, req.body);
        return successResponse(req, res, user, 200);
    } catch (error) {
        return errorResponse(req, res, error.message, 500);
    }
};

const remove = async (req, res) => {
    try {
        await userService.deleted(req.params.id);
        return successResponse(req, res, "Usuario eliminado exitosamente", 200);
    } catch (error) {
        return errorResponse(req, res, error.message, 500);
    }
};
const uploadAvatar = async (req, res) => {
    try {
        const { id } = req.params;
        const { file } = req;
        if (!file) {
            return errorResponse(req, res, "No se subió ningún archivo", 400);
        }
        const result = await userService.updateAvatar(id, file);
        return successResponse(req, res, {
            msg: "Imagen modificada correctamente",
            user: id,
            img: result.avatar,
        }, 200);
    } catch (error) {
        return errorResponse(req, res, error.message, 500);
    }
};


module.exports = {
    create,
    getAll,
    getById,
    update,
    remove,
    uploadAvatar
};