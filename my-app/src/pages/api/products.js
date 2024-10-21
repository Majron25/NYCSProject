import db from "../../../lib/db";

export default async function handler(req, res) {
  const connection = await db();

  if (req.method === "GET") {
    // Fetch all products
    const [rows] = await connection.query("SELECT * FROM Products");
    res.status(200).json({ products: rows });
  } else if (req.method === "POST") {
    // Insert new product (ensure you handle incoming data securely)
    const { name, description, product_image, price, promotion } = req.body;
    const [result] = await connection.query(
      "INSERT INTO Products (name, description, product_image, price, promotion) VALUES (?, ?, ?, ?, ?)",
      [name, description, product_image, price, promotion]
    );
    res.status(201).json({ productId: result.insertId });
  }

  connection.end();
}
