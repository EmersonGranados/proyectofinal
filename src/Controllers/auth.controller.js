const { successResponse, errorResponse } = require('../utils/response');
const authService = require('../services/auth.services');

const create = async (req, res) => {
    try {
        const auth = await authService.create(req.body);
        return successResponse(req, res, auth, 201);
    } catch (error) {
        return errorResponse(req, res, error.message, 500);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const resp = await authService.login(email, password);
        return successResponse(req, res, resp, 200);
    } catch (error) {
        return errorResponse(req, res, error.message, 401);
    }
};

module.exports = {
    create,
    login,
};