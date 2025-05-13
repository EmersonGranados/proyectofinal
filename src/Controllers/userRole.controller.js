const UserRole = require("../models/userRole.model"); 
const response = require("../res/response");

const getAll = async (req, res, next) => {
  try {
    const userRoles = await UserRole.findAll(); 
    let data = "";

    if (userRoles.length > 0) {
      data = {
        total_registros: userRoles.length,
        data: userRoles,
      };
    } else {
      data = { message: "No user roles found in this table" };
    }

    response.success(req, res, data, 200);

  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const userRole = await UserRole.findOne({ where: { id } }); 
    let data = "";

    if (userRole) {
      data = {
        data: userRole,
      };
    } else {
      data = { message: "User role not found with this ID" };
    }

    response.success(req, res, data, 200);

  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const data = req.body;
    await UserRole.sync(); 
    const created = await UserRole.create(data);
    message = {
      msg: "User role created successfully",
      regID: created.id,
    };
    response.success(req, res, message, 201);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updated = await UserRole.update(data, { where: { id } });
    message = {
      msg: "User role updated successfully",
      regID: id,
    };
    response.success(req, res, message, 200);
  } catch (error) {
    next(error);
  }
};

const deleted = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleted = await UserRole.destroy({ where: { id } });
    message = {
      msg: "User role deleted successfully",
      regID: id,
    };
    response.success(req, res, message, 200);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleted,
};