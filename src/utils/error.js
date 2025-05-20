const { errorResponse } = require("./response");

function errors(err, req, res, next) {
    console.error("Error:", err);

    const message = err.message || "Internal Server Error";
    let status = err.statusCode || 500;

    errorResponse(req, res, message, status);
}

module.exports = errors;