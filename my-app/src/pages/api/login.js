import bcrypt from 'bcryptjs';
import { pool } from '../../../lib/db'; // Import your database connection

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      // Check if the user exists
      const userResult = await pool.query('SELECT * FROM Customers WHERE email = $1', [email]);
      if (userResult.rows.length === 0) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }

      const user = userResult.rows[0];

      // Compare the password
      const passwordMatch = await bcrypt.compare(password, user.password_hash);
      if (!passwordMatch) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }

      // Update the last_login column
      await pool.query('UPDATE Customers SET last_login = NOW() WHERE id = $1', [user.id]);

      // Return user data (or create a session here)
      res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error logging in' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
