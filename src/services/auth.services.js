const Auth = require("../models/auth.models");
const User = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const create = async (data) => {
    await Auth.sync();
    const hashedPassword = await bcrypt.hash(data.password.toString(), 10);
    const auth = await Auth.create({
        id: data.id,
        email: data.email,
        password: hashedPassword,
    });
    return auth;
};

const validatePassword = async (plainPassword, hashedPassword, userData, user) => {
    const isValid = await bcrypt.compare(plainPassword, hashedPassword);
    if (!isValid) {
        throw new Error("Usuario o contraseña incorrectos");
    }
    const token = jwt.sign(
        { id: userData.id, email: userData.email },
        "tu_clave_secreta", // Usa process.env.JWT_SECRET en producción
        { expiresIn: "1h" }
    );
    return { token, user };
};

const login = async (email, password) => {
    const data = await Auth.findOne({ where: { email } });
    const user = await User.findOne({ where: { email } });
    if (!data || !user) {
        throw new Error("Usuario o contraseña incorrectos");
    }
    return await validatePassword(password, data.password, data, user);
};

module.exports = {
    create,
    login,
};
