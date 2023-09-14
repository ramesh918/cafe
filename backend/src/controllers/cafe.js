// controllers/cafeController.js

const {Cafe, Employee, sequelize} = require("../../models")


// Create a new café
async function createCafe(req, res) {
  try {
    const cafe = await Cafe.create(req.body);
    return res.status(201).json(cafe);
  } catch (error) {
    return res.status(400).json({ error: 'Could not create café' });
  }
}

// Retrieve all cafés
async function getAllCafes(req, res) {
  try {
    const cafes = await Cafe.findAll();
    return res.json(cafes);
  } catch (error) {
    return res.status(500).json({ error: 'Could not retrieve cafés' });
  }
}

// Retrieve a café by ID
async function getCafeById(req, res) {
  const { id } = req.params;
  try {
    const cafe = await Cafe.findByPk(id, {
      include: Employee, // Include associated employees
    });
    if (!cafe) {
      return res.status(404).json({ error: 'Café not found' });
    }
    return res.json(cafe);
  } catch (error) {
    return res.status(500).json({ error: 'Could not retrieve café' });
  }
}

// Update a café by ID
async function updateCafe(req, res) {
  const { id } = req.params;
  try {
    const [updated] = await Cafe.update(req.body, {
      where: { id },
    });
    if (updated) {
      const updatedCafe = await Cafe.findByPk(id);
      return res.json(updatedCafe);
    }
    return res.status(404).json({ error: 'Café not found' });
  } catch (error) {
    return res.status(500).json({ error: 'Could not update café' });
  }
}

// Delete a café by ID
async function deleteCafe(req, res) {
  const { id } = req.params;
  try {
    const cafe = await Cafe.findByPk(id);
    if (!cafe) {
      return res.status(404).json({ error: 'Café not found' });
    }
    await cafe.destroy();
    return res.status(204).send({message:"Cafe Deleted Sucessfully"});
  } catch (error) {
    return res.status(500).json({ error: 'Could not delete café' });
  }
}



// GET /cafes?location=<location>
async function getCafesByLocation(req, res) {
  const { location } = req.query;
  try {
    let whereClause = {};
    
    // If a valid location is provided, add it to the WHERE clause
    if (location) {
      whereClause = { location };
    }

    // Retrieve cafes with associated employee count, sorted by the highest number of employees first
    const cafes = await Cafe.findAll({
      where: whereClause,
      include: {
        model: Employee,
        attributes: [],
      },
      attributes: [
        'id',
        'name',
        'description',
        'logo',
        'location',
        [sequelize.fn('COUNT', sequelize.col('Employees.id')), 'employeeCount'],
      ],
      group: ['Cafe.id'],
      order: [[sequelize.literal('employeeCount'), 'DESC']],
    });

    return res.json(cafes);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Could not retrieve cafes' });
  }
}


async function getCafeLocations(req, res) {
  try {
    const locations = await Cafe.findAll({
      attributes: ['location'],
      group: ['location'],
    });

    const uniqueLocations = locations.map((cafe) => cafe.location);
    return res.json(uniqueLocations);
  } catch (error) {
    return res.status(500).json({ error: 'Could not retrieve café locations' });
  }
}


module.exports = {
  createCafe,
  getAllCafes,
  getCafeById,
  updateCafe,
  deleteCafe,
  getCafesByLocation,
  getCafeLocations
};
