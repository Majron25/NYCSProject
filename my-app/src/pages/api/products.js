import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  try {
    // Now try fetching the products
    const { rows } = await sql`SELECT * FROM products;`; // Fetch all products
    //console.log(rows);
    res.setHeader("Cache-Control", "no-store"); // Disable caching
    res.status(200).json({ products: rows });
  } catch (error) {
    console.error("Error fetching products:", error); // Log full error details
    res
      .status(500)
      .json({ error: "Failed to fetch products", details: error.message });
  }
}
