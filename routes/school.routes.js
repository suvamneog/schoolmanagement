const express = require('express');
const schoolController = require('../controllers/school.controller');

const router = express.Router();

// Add a new school
router.post('/addSchool', schoolController.addSchool);

// List all schools sorted by proximity
router.get('/listSchools', schoolController.listSchools);

module.exports = router;