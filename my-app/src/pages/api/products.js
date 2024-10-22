import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  try {
    const products = await sql`SELECT * FROM Products;`;  // Fetch all products
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
}
