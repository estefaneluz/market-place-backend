const express = require("express");
const users = require("./controllers/users");
const authLogin = require("./filters/authLogin");
const { login } = require("./controllers/login");

const routes = express();

routes.post("/login", login);
routes.post("/cadastro", users.registerUser);

routes.use(authLogin);

//users
routes.get("/perfil", users.getUser);
routes.put("/perfil", users.updateUser);

module.exports = routes;