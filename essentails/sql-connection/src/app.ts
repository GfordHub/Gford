import express from 'express';
import { createConnection } from './config/database';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Initialize database connection
createConnection()
    .then(() => {
        console.log('Database connection established successfully.');
    })
    .catch(err => {
        console.error('Database connection failed:', err);
    });

// Sample route
app.get('/', (req, res) => {
    res.send('Welcome to the SQL Connection App!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});