const Joi = require('joi');

// Validation schema for adding a school
const schoolValidationSchema = Joi.object({
  name: Joi.string().required().min(2).max(255).messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 2 characters long',
    'string.max': 'Name cannot exceed 255 characters',
    'any.required': 'Name is required'
  }),
  address: Joi.string().required().min(5).max(255).messages({
    'string.base': 'Address must be a string',
    'string.empty': 'Address is required',
    'string.min': 'Address must be at least 5 characters long',
    'string.max': 'Address cannot exceed 255 characters',
    'any.required': 'Address is required'
  }),
  latitude: Joi.number().required().min(-90).max(90).messages({
    'number.base': 'Latitude must be a number',
    'number.min': 'Latitude must be at least -90',
    'number.max': 'Latitude cannot exceed 90',
    'any.required': 'Latitude is required'
  }),
  longitude: Joi.number().required().min(-180).max(180).messages({
    'number.base': 'Longitude must be a number',
    'number.min': 'Longitude must be at least -180',
    'number.max': 'Longitude cannot exceed 180',
    'any.required': 'Longitude is required'
  })
});

// Validation schema for listing schools
const listSchoolsValidationSchema = Joi.object({
  latitude: Joi.number().required().min(-90).max(90).messages({
    'number.base': 'Latitude must be a number',
    'number.min': 'Latitude must be at least -90',
    'number.max': 'Latitude cannot exceed 90',
    'any.required': 'Latitude is required'
  }),
  longitude: Joi.number().required().min(-180).max(180).messages({
    'number.base': 'Longitude must be a number',
    'number.min': 'Longitude must be at least -180',
    'number.max': 'Longitude cannot exceed 180',
    'any.required': 'Longitude is required'
  })
});

module.exports = {
  schoolValidationSchema,
  listSchoolsValidationSchema
};