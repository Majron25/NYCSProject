import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Handle GET request to fetch all products
    try {
      const { rows } = await sql`SELECT * FROM products;`; // Fetch all products
      res.setHeader("Cache-Control", "no-store"); // Disable caching
      res.status(200).json({ products: rows });
    } catch (error) {
      console.error("Error fetching products:", error); // Log full error details
      res.status(500).json({ error: "Failed to fetch products", details: error.message });
    }
  } else if (req.method === 'POST') {
    // Handle POST request to add a new product
    const { name, description, product_image, price, promotion } = req.body;

    // Ensure all required fields are provided
    if (!name || !description || !product_image || price === undefined || promotion === undefined) {
      return res.status(400).json({ error: "All fields are required to add a product" });
    }

    try {
      // Insert the new product into the database
      const result = await sql`
        INSERT INTO products (name, description, product_image, price, promotion) 
        VALUES (${name}, ${description}, ${product_image}, ${price}, ${promotion}) 
        RETURNING *;
      `;
      
      // Return the newly added product
      const newProduct = result.rows[0];
      res.status(201).json({ product: newProduct });
    } catch (error) {
      console.error("Error adding product:", error); // Log full error details
      res.status(500).json({ error: "Failed to add product", details: error.message });
    }
  } else if (req.method === 'PUT') {
    // Handle PUT request to update a product
    const { id, name, description, price, promotion } = req.body;

    // Ensure all required fields are present
    if (!id || !name || !description || price === undefined || promotion === undefined) {
      return res.status(400).json({ error: "All fields are required to update a product" });
    }

    try {
      // Update the product in the database
      await sql`
        UPDATE products 
        SET name = ${name}, description = ${description}, price = ${price}, promotion = ${promotion} 
        WHERE id = ${id}
      `;
      res.status(200).json({ message: "Product updated successfully" });
    } catch (error) {
      console.error("Error updating product:", error); // Log full error details
      res.status(500).json({ error: "Failed to update product", details: error.message });
    }
  } else if (req.method === 'DELETE') {
    // Handle DELETE request to delete a product by ID
    const { id } = req.query; // Product ID is passed as a query parameter

    // Ensure the ID is provided
    if (!id) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    try {
      // Delete the product from the database
      const result = await sql`
        DELETE FROM products
        WHERE id = ${id}
      `;

      // Check if any rows were affected (i.e., the product was deleted)
      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error); // Log full error details
      res.status(500).json({ error: "Failed to delete product", details: error.message });
    }
  } else {
    // Return 405 for unsupported request methods
    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
