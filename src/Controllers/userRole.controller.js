const { successResponse, errorResponse } = require('../utils/response');
const userRoleService = require('../services/userRole.services');

const create = async (req, res) => {
    try {
        const userRole = await userRoleService.created(req.body);
        return successResponse(req, res, userRole, 201);
    } catch (error) {
        return errorResponse(req, res, error.message, 500);
    }
};

const getAll = async (req, res) => {
    try {
        const userRoles = await userRoleService.getAll();
        return successResponse(req, res, userRoles, 200);
    } catch (error) {
        return errorResponse(req, res, error.message, 500);
    }
};

const getById = async (req, res) => {
    try {
        const { user_id, role_id } = req.params;
        const userRole = await userRoleService.getById(user_id, role_id);
        if (!userRole) {
            return errorResponse(req, res, "Relación no encontrada", 404);
        }
        return successResponse(req, res, userRole, 200);
    } catch (error) {
        return errorResponse(req, res, error.message, 500);
    }
};

const update = async (req, res) => {
    try {
        const { user_id, role_id } = req.params;
        const userRole = await userRoleService.Updated(user_id, role_id, req.body);
        return successResponse(req, res, userRole, 200);
    } catch (error) {
        return errorResponse(req, res, error.message, 500);
    }
};

const remove = async (req, res) => {
    try {
        const { user_id, role_id } = req.params;
        await userRoleService.deleted(user_id, role_id);
        return successResponse(req, res, "Relación eliminada exitosamente", 200);
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