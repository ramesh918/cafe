// routes/employeeRoutes.js

const express = require('express');
const employeeController = require('../controllers/employee');
const { employeeSchema } = require('../validations/employee');

const router = express.Router();

// Middleware function for validating employee data
function validateEmployeeData(req, res, next) {
  const { error } = employeeSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

// Create a new employee with validation middleware
router.post('/', validateEmployeeData, employeeController.createEmployee);

// Retrieve all employees
router.get('/', employeeController.getEmployeesByCafe);

// Retrieve an employee by ID
router.get('/:id', employeeController.getEmployeeById);

// Update an employee by ID with validation middleware
router.put('/:id', validateEmployeeData, employeeController.updateEmployee);

// Delete an employee by ID
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;
