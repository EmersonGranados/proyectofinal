exports.successResponse = function (req, res, message = "", status = 200) {
res.status(status).json({
    ok: true,
    status: status,
    body: message,
});
};

exports.errorResponse = function (req, res, message = "Error Interno", status = 500) {
res.status(status).json({
    ok: false,
    status: status,
    body: message,
});
};