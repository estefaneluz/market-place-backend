const express = require("express");
const users = require("./controllers/users");
const products = require("./controllers/products");
const authLogin = require("./filters/authLogin");
const { login } = require("./controllers/login");

const routes = express();

routes.post("/login", login);
routes.post("/cadastro", users.registerUser);

routes.use(authLogin);

//users
routes.get("/perfil", users.getUser);
routes.put("/perfil", users.updateUser);

//products 
routes.get("/produtos", products.getAllProducts);
routes.get("/produtos/:id", products.getProduct);
routes.post("/produtos", products.registerProduct);
routes.put("/produtos/:id", products.updateProduct);
routes.delete("/produtos/:id", products.deleteProduct);

module.exports = routes;