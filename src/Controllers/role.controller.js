const {successResponse, errorResponse} = require('../utils/response');
const roleService = require('../services/role.services');

const create = async (req, res) => {
    try {
        const role = await roleService.created(req.body);
        return successResponse(req, res, role, 201);
    } catch (error) {
        return errorResponse(req, res, error.message, 500);
    }
};

const getAll = async (req, res) => {
    try {
        const roles = await roleService.getAll();
        return successResponse(req, res, roles, 200);
    } catch (error) {
        return errorResponse(req, res, error, error.message, 500);
    }
};

const getById = async (req, res) => {
    try {
        const role = await roleService.getById(req.params.id);
        if (!role) {
            return errorResponse(req, res, "Rol no encontrado", 404);
        }
        return successResponse(req, res, role, 200);
    } catch (error) {
        return errorResponse(req, res, error.message, 500);
    }
};

const update = async (req, res) => {
    try {
        const role = await roleService.Updated(req.params.id, req.body);
        return successResponse(req, res, role, 200);
    } catch (error) {
        return errorResponse(req, res, error.message, 500);
    }
};

const remove = async (req, res) => {
    try {
        await roleService.deleted(req.params.id);
        return successResponse(req, res, "Rol eliminado exitosamente", 200);
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
};