// controllers/employeeController.js

const {Employee, Cafe,sequelize} = require('../../models');


// Create a new employee
async function createEmployee(req, res) {
  try {
    // Check if a cafe with the specified cafeId exists
    const cafe = await Cafe.findByPk(req.body.cafeId);
    if (!cafe) {
      return res.status(400).json({ error: 'Cafe with the specified ID does not exist' });
    }

    // Check if an employee with the same email address already exists
    const existingEmployee = await Employee.findOne({
      where: {
        email_address: req.body.email_address,
      },
    });

    if (existingEmployee) {
      return res.status(400).json({ error: 'An employee with the same email address already exists' });
    }

    // If both checks pass, create the new employee
    const employee = await Employee.create(req.body);
    return res.status(201).json(employee);
  } catch (error) {
    return res.status(400).json({ error: 'Could not create employee', actualError: error });
  }
}

// Retrieve all employees
async function getAllEmployees(req, res) {
  try {
    const employees = await Employee.findAll();
    return res.json(employees);
  } catch (error) {
    return res.status(500).json({ error: 'Could not retrieve employees' });
  }
}

// Retrieve an employee by ID
async function getEmployeeById(req, res) {
  const { id } = req.params;
  try {
    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    return res.json(employee);
  } catch (error) {
    return res.status(500).json({ error: 'Could not retrieve employee' });
  }
}

// Update an employee by ID
async function updateEmployee(req, res) {
  const { id } = req.params;
  try {
    const [updated] = await Employee.update(req.body, {
      where: { id },
    });
    if (updated) {
      const updatedEmployee = await Employee.findByPk(id);
      return res.json(updatedEmployee);
    }
    return res.status(404).json({ error: 'Employee not found' });
  } catch (error) {
    return res.status(500).json({ error: 'Could not update employee' });
  }
}

// Delete an employee by ID
async function deleteEmployee(req, res) {
  const { id } = req.params;
  try {
    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    await employee.destroy();
    return res.status(204).send({message: 'Employee Deleted Successfully'});
  } catch (error) {
    return res.status(500).json({ error: 'Could not delete employee' });
  }
}

// controllers/employeeController.js






// GET /employees?cafe=<café>
async function getEmployeesByCafe(req, res) {
  const { cafe } = req.query;

  try {
    let whereClause = {};

    // If a café is provided, add it to the WHERE clause
    if (cafe) {
      whereClause = { '$Cafe.name$': cafe };
    }

    // Calculate the number of days worked using Sequelize literal
    const employees = await Employee.findAll({
      where: whereClause,
      include: {
        model: Cafe,
        attributes: [],
      },
      attributes: [
        'id',
        'name',
        'email_address',
        'phone_number',
        [sequelize.literal('DATEDIFF(NOW(), Employee.createdAt)'), 'days_worked'],
        [sequelize.col('Cafe.name'), 'cafe'],
      ],
      order: [[sequelize.literal('days_worked'), 'DESC']],
    });

    return res.json(employees);
  } catch (error) {
    return res.status(500).json({ error: 'Could not retrieve employees' });
  }
}






module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getEmployeesByCafe
};
