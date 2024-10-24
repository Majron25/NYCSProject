import { Pool } from 'pg';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL, // Use the appropriate connection string
  ssl: {
    rejectUnauthorized: false, // This is necessary for some environments, including Vercel
  },
});

// Export the pool for use in your API routes
export { pool };
