const express = require("express");
const users = require("./controllers/users");

const routes = express();

//users
routes.post("/cadastro", users.registerUser);
routes.get("/perfil", users.getUser);
routes.put("/perfil", users.editUser)

module.exports = routes;