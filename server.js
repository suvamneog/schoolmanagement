const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { initializeDatabase } = require('./config/db.config');
const schoolRoutes = require('./routes/school.routes');
const { errorHandler, notFound } = require('./middleware/error.middleware');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', schoolRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to School Management API',
    version: '1.0.0',
    endpoints: {
      addSchool: '/api/addSchool',
      listSchools: '/api/listSchools'
    }
  });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

// Initialize database and start server
async function startServer() {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`API Documentation: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

module.exports = app; // For testing purposes