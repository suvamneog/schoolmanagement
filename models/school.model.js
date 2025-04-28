const { pool } = require('../config/db.config');

class School {
  constructor(school) {
    this.name = school.name;
    this.address = school.address;
    this.latitude = school.latitude;
    this.longitude = school.longitude;
  }

  // Add a new school
  static async create(newSchool) {
    try {
      const [result] = await pool.query(
        'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
        [newSchool.name, newSchool.address, newSchool.latitude, newSchool.longitude]
      );
      
      return { id: result.insertId, ...newSchool };
    } catch (error) {
      console.error('Error creating school:', error);
      throw error;
    }
  }

  // Get all schools
  static async findAll() {
    try {
      const [rows] = await pool.query('SELECT * FROM schools');
      return rows;
    } catch (error) {
      console.error('Error finding schools:', error);
      throw error;
    }
  }

  // Get school by id
  static async findById(id) {
    try {
      const [rows] = await pool.query('SELECT * FROM schools WHERE id = ?', [id]);
      if (rows.length === 0) {
        return null;
      }
      return rows[0];
    } catch (error) {
      console.error('Error finding school by id:', error);
      throw error;
    }
  }
}

module.exports = School