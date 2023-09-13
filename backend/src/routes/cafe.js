// routes/cafeRoutes.js

const express = require('express');
const cafeController = require('../controllers/cafe');

const { cafeSchema } = require('../validations/cafe'); // Import the validation schema

const router = express.Router();

// Middleware function for validating café data
function validateCafeData(req, res, next) {
  const { error } = cafeSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

// Create a new café
router.post('/', validateCafeData, cafeController.createCafe);

// Retrieve all cafés
router.get('/', cafeController.getCafesByLocation);

router.get('/locations', cafeController.getCafeLocations);

// Retrieve a café by ID
router.get('/:id', cafeController.getCafeById);

// Update a café by ID
router.put('/:id', validateCafeData, cafeController.updateCafe);



// Delete a café by ID
router.delete('/:id', cafeController.deleteCafe);



module.exports = router;
