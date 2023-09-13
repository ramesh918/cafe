const express = require('express');
const cafeRoutes = require('./cafe');
const employeeRoutes = require('./employee');

const router = express.Router();

// Import and use the employee and café routes
router.use('/cafes', cafeRoutes);
router.use('/employees', employeeRoutes);

module.exports = router;