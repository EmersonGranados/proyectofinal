const response = require('./response');

function errors(err, req, res, next){
  console.error("Error :", err);

  const message = err.message || "Error Interno del Servidor";
  const statusCode = err.statusCode || 500;

  response.error(req, res, message, statusCode);
}

module.exports = errors;