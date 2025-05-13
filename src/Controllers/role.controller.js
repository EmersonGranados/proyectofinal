const Rol = require("../models/rol.model");
const response = require("../res/response");

const getAll = async (req, resp, next) => {
  try {
    const roles = await Rol.findAll();
    let data = "";

    if (roles.length > 0) {
      data = {
        total_reg: roles.length,
        data: roles,
      };
    } else {
      data = { message: "This table has no records" };
    }
    response.success(req, resp, data, 200);
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const rol = await Rol.findOne({ where: { id } });
    let data = "";
    if (rol) {
      data = {
        data: rol,
      };
    } else {
      data = { message: "This query has no records" };
    }
    response.success(req, res, data, 200);
  } catch (error) {
    next(error);
  }
};

const created = async (req, res, next) => {
  try {
    const data = req.body;
    await Rol.sync();
    const created = await Rol.create(data);
    message = {
      msg: "Record was created successfully",
      regID: created.id,
    };
    response.success(req, res, message, 201);
  } catch (error) {
    next(error);
  }
};

const updated = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updated = await Rol.update(data, { where: { id } });
    message = {
      msg: "Record was updated successfully",
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
    const deleted = await Rol.destroy({ where: { id } });
    message = {
      msg: "Record was deleted successfully",
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
  created,
  updated,
  deleted,
};

