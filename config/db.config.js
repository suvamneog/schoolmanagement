const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000, // 10 seconds timeout
  ssl: process.env.DB_SSL ? { rejectUnauthorized: false } : undefined
};

const pool = mysql.createPool(dbConfig);

async function initializeDatabase() {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log('Successfully connected to database');
    
    await connection.query(`
      CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        latitude FLOAT NOT NULL,
        longitude FLOAT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    console.log('Database tables verified');
    return true;
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
}

// Test connection immediately and retry if needed
async function testConnection(retries = 3, delay = 2000) {
  for (let i = 0; i < retries; i++) {
    try {
      await initializeDatabase();
      return true;
    } catch (err) {
      if (i === retries - 1) throw err;
      console.log(`Retrying connection (${i + 1}/${retries})...`);
      await new Promise(res => setTimeout(res, delay));
    }
  }
}

module.exports = {
  pool,
  initializeDatabase: testConnection
};