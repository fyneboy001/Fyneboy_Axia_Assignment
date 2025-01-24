const express = require("express");
const route = express.Router();
const {
  createUser,
  userLogin,
  deleteUser,
} = require("../controller/controller.user");

//CRUD Operator
route.post("/user", createUser);
route.post("/user", userLogin);
route.delete("/user", deleteUser);

module.exports = route;
