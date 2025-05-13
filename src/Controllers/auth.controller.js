const Auth = require("../models/auth.model");
const User = require("../models/user.model");
const response = require("../res/response");
const bcrypt = require("bcrypt");
const auth = require("../auth");

async function login(req, res, next) {
  let email = req.body.email;
  let password = req.body.password;
  try {
    const data = await Auth.findOne({ where: { email } });
    const user = await User.findOne({ where: { email } });
    const resp = await validatePassword(password, data.password, data, user);
    response.success(req, res, resp, 200);
  } catch (error) {
    next(error);
  }
}

const validatePassword = (pass1, pass2, data, user) => {
  return bcrypt.compare(pass1, pass2).then((res) => {
    if (res === true) {
      data.RolId = user.RolId;
        var resp = {
          token: auth.assignToken({...data}),
          user: user,
        };
        return resp;
    } else {
      throw new Error('Invalid information');
    }
  });
};

const create = async (req, res, next) => {
  try {
    const data = req.body;
    await Auth.sync();
    password = await bcrypt.hash(data.password.toString(), 10);
    created = await Auth.create({
      id: data.id,
      email: data.email,
      password: password,
    });
    message = {
      msg: "Record was created successfully",
      regID: created.id,
    };
    response.success(req, res, message, 201);
  } catch (error) {
    next(error);
  }
};

module.exports = {
    create,
    login,
};