require("./models/associations");

const app = require("./app/app");

const port = app.get("port");

app.listen(port, () => {
    console.log("Servidor escuchando en el puerto", port);
});