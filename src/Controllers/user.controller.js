const User = require("../models/user.model");
const Rol = require("../models/rol.model");
const Auth = require("../models/auth.model");
const response = require("../res/response");
const bcrypt = require("bcrypt");
const fs = require("fs");

const getAll = async (req, res, next)=>{
  try {
    const users = await User.findAll({ include: { model: Rol, as: "Rol" } });
    let data = "";
    if (users.length > 0) {
      data = {
        total_registros: users.length,
        data: users,
      };
    } else {
      data = {
        message: 'this table has no records' 
        };
    }
    response.success(req, res, data, 200);

  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const users = await User.findOne({where: {id}, include: { model: Rol, as: "Rol" } });
    let data = "";
    if (user) {
      data = {
        total_resgistros: users.length,
        data: user,
      };
    } else {
      data = { 
        message: "this table has no records",
    };
    }
    response.success(req, res, data, 200);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const data = req.body;
    await User.sync();
    const created = await User.create(data);
    message = {
      msg: "Record was created succesfully",
      userID: created.id,
    };
    let createdAuth = "";
    if (data.email && data.password) {
      await Auth.sync();
      password = await bcrypt.hash(data.password.toString(), 10);
      createdAuth = await Auth.create({
        id: created.id,
        email: data.email,
        password: password,
      });
      message.authID = createdAuth.id;
    }
    response.success(req, res, message, 201);

  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const data = req.body;
    const id = req.params.id;
    const updated = await User.update(data, { where: { id } });
    message = {
      msg: "Record was Updated successsfully",
      regID: id,
    }
    response.success(req, res, message, 200);
  } catch (error) {
    next(error)
  }
};

const deleted = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleted = await User.destroy({ where: { id } });
    message = {
      msg: "Record was deleted successsfully",
      regID: id,
    }
    response.success(req, res, message, 200);
  } catch (error) {
    next(error)
  }
};

const uploadAvatar = async (req, res, next) => {
  const { file } = req;
  let filePath = file.path;
  let imagePath = `http://localhost:3000/images/users/avatar/${file.filename}`;
  let data = {
    avatar: imagePath,
    imagePath: filePath,
  };
  try {
    const id = req.params.id;
    const user = await User.findOne({ where: { id } });
    if (user.imagePath != null) {
      fs.unlink(user.imagePath, (err) => {
        if (err) {
          console.log(err);
          return
        }
      });
    }

    const updated = await User.update(data, { where: { id } });
    message = {
      msg: "Image was modified successfully",
      user: req.body.id,
      img: imagePath
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
  uploadAvatar
};
