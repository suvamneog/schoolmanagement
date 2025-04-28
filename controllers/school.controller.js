const School = require('../models/school.model');
const { sortSchoolsByDistance } = require('../utils/distance.util');
const { schoolValidationSchema, listSchoolsValidationSchema } = require('../utils/validation');

// Create and Save a new School
exports.addSchool = async (req, res) => {
  try {
    // Validate request
    const { error, value } = schoolValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map(detail => detail.message)
      });
    }

    // Create a School
    const school = new School({
      name: value.name,
      address: value.address,
      latitude: value.latitude,
      longitude: value.longitude
    });

    // Save School in the database
    const data = await School.create(school);
    
    res.status(201).json({
      success: true,
      message: 'School added successfully',
      data
    });
  } catch (err) {
    console.error('Error while adding school:', err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: err.message
    });
  }
};

// Retrieve all Schools sorted by proximity to user location
exports.listSchools = async (req, res) => {
  try {
    // Validate request
    const { error, value } = listSchoolsValidationSchema.validate(req.query);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map(detail => detail.message)
      });
    }

    const { latitude, longitude } = value;
    
    // Retrieve all schools from the database
    const schools = await School.findAll();
    
    // Sort schools by distance
    const sortedSchools = sortSchoolsByDistance(schools, latitude, longitude);
    
    res.status(200).json({
      success: true,
      message: 'Schools retrieved successfully',
      count: sortedSchools.length,
      data: sortedSchools
    });
  } catch (err) {
    console.error('Error while listing schools:', err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: err.message
    });
  }
};