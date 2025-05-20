const express = require("express");
const morgan = require("morgan");
const config = require("../config");
const cors = require("cors");
const path = require("path");


const roles = require("../routes/role.routes");
const users = require("../routes/user.routes");
const auth = require("../routes/auth.routes");
const userRoles = require("../routes/userRole.routes");
const errors = require("../utils/error"); 

const app = express();


app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("port", config.app.port);

app.use("/api/v1/roles", roles);
app.use("/api/v1/users", users);
app.use("/api/v1/auth", auth);
app.use("/api/v1/user-roles", userRoles);
app.use(errors);

// Public static files
app.use(express.static(path.join(__dirname, "../../uploads")));

// Endpoint not found
app.use((req, res, next) => {
    res.status(404).json({
        message: "Endpoint not found",
    });
});

module.exports = app;