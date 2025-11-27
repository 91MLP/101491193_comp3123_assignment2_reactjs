const express = require("express");
const employeeController = require("../controller/employeeController");
const employeeRouter = express.Router();

employeeRouter
  .route("/employees")
  .get(employeeController.getAllEmployee)
  .post(employeeController.createEmployee);
employeeRouter
  .route("/employees/:id")
  .get(employeeController.getEmployee)
  .put(employeeController.updateEmployee)
  .delete(employeeController.deleteEmployee);

module.exports = employeeRouter;
