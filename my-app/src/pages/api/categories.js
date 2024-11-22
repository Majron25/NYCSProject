import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  const { method } = req;

  if (method === 'GET') {
    const { query } = req.query; // Search query parameter

    try {
      let rows;
      if (query) {
        // If a search query is provided, fetch matching categories
        rows = (await sql`
          SELECT * FROM categories
          WHERE LOWER(name) LIKE ${'%' + query.toLowerCase() + '%'}
          ORDER BY id ASC;
        `).rows;
      } else {
        // If no search query is provided, fetch all categories
        rows = (await sql`
          SELECT * FROM categories
          ORDER BY id ASC;
        `).rows;
      }

      res.setHeader("Cache-Control", "no-store"); // Disable caching
      res.status(200).json({ categories: rows });
    } catch (error) {
      console.error("Error fetching categories:", error); // Log full error details
      res.status(500).json({ error: "Failed to fetch categories", details: error.message });
    }
  } 
  else if (method === 'POST') {
    const { name } = req.body;

    // Ensure the required fields are provided
    if (!name) {
      return res.status(400).json({ error: "Category name is required" });
    }

    try {
      // Insert the new category into the database
      const result = await sql`
        INSERT INTO categories (name) 
        VALUES (${name}) 
        RETURNING *;
      `;

      // Return the newly added category
      const newCategory = result.rows[0];
      res.status(201).json({ category: newCategory });
    } catch (error) {
      console.error("Error adding category:", error); // Log full error details
      res.status(500).json({ error: "Failed to add category", details: error.message });
    }
  } 
  else if (method === 'PUT') {
    const { id, name } = req.body;

    // Ensure all required fields are provided
    if (!id || !name) {
      return res.status(400).json({ error: "Category ID and name are required to update" });
    }

    try {
      // Update the category in the database
      const result = await sql`
        UPDATE categories 
        SET name = ${name} 
        WHERE id = ${id}
        RETURNING *;
      `;

      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Category not found" });
      }

      res.status(200).json({ message: "Category updated successfully", category: result.rows[0] });
    } catch (error) {
      console.error("Error updating category:", error); // Log full error details
      res.status(500).json({ error: "Failed to update category", details: error.message });
    }
  } 
  else if (method === 'DELETE') {
    const { id } = req.query; // Category ID passed as a query parameter
    console.log("Received ID for deletion:", id.id); // Should display the ID, e.g., "Received ID for deletion: 2"

    // Ensure the ID is provided
    if (!id) {
      return res.status(400).json({ error: "Category ID is required" });
    }

    try {
      // Delete the category from the database
      const result = await sql`
        DELETE FROM categories
        WHERE id = ${id}
        RETURNING *;
      `;

      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Category not found" });
      }

      res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
      console.error("Error deleting category:", error); // Log full error details
      res.status(500).json({ error: "Failed to delete category", details: error.message });
    }
  } 
  else {
    // Return 405 for unsupported request methods
    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
