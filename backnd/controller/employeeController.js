const Employees = require("../models/employeesModel");

exports.getAllEmployee = async (req, res) => {
  try {
    const employees = await Employees.find();
    res.status(200).json({
      status: "success",
      results: employees.length,
      data: employees,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.getEmployee = async (req, res) => {
  try {
    const employee = await Employees.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ status: "success", data: employee });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const newEmployee = await Employees.create(req.body);
    res.status(200).json({
      status: "success",
      data: newEmployee,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const update = await Employees.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!update) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ status: "success", data: update });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const deletes = await Employees.findByIdAndDelete(req.params.id);
    if (!deletes) {
      return res.status(404).json({ message: "Employee not found" });
    }
    return res.status(204).json({ status: "success", data: null });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};
