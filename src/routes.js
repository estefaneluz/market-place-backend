const express = require("express");
const users = require("./controllers/users");
const { login } = require("./controllers/login");

const routes = express();

routes.post("/login", login);

//users
routes.post("/cadastro", users.registerUser);
routes.get("/perfil", users.getUser);
routes.put("/perfil", users.editUser);

module.exports = routes;