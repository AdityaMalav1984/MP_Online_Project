require('dotenv').config();
const { Pool } = require('pg');

// Initialize pool with an empty config if DATABASE_URL is not set
// This prevents the app from crashing on Vercel build time
let poolConfig = {};
if (process.env.DATABASE_URL) {
    poolConfig = {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    };
}

const pool = new Pool(poolConfig);

// Initialize the database table if it doesn't exist
const initDb = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS Tasks (
                id SERIAL PRIMARY KEY,
                employee_name VARCHAR(100) NOT NULL,
                title VARCHAR(255) NOT NULL,
                completed INTEGER DEFAULT 0
            )
        `);
        console.log("Database initialized successfully.");
    } catch (err) {
        console.error("Error initializing database:", err);
    }
};

// Only initialize if we have a connection string
if (process.env.DATABASE_URL) {
    initDb();
} else {
    console.warn("No DATABASE_URL provided. Database will not be initialized.");
}

module.exports = pool;
