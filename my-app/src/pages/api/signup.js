import bcrypt from 'bcryptjs';
import { pool } from '../../../lib/db'; // Import your database connection

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { firstName, lastName, email, password } = req.body;

    try {
      // Check if the email already exists
      const existingUser = await pool.query('SELECT * FROM Customers WHERE email = $1', [email]);
      if (existingUser.rows.length > 0) {
        return res.status(400).json({ error: 'Email already existsasdasdas' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert the new user into the database
      const result = await pool.query(
        'INSERT INTO Customers (first_name, last_name, email, password_hash, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
        [firstName, lastName, email, hashedPassword]
      );

      res.status(201).json({ user: result.rows[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error creating account' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
