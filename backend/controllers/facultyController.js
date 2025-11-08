import pool from '../config/database.js';

// Get all faculty
export const getAllFaculty = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT f.*, d.dept_name 
      FROM faculty f 
      JOIN departments d ON f.department = d.dept_id 
      ORDER BY f.id
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching faculty:', error);
    res.status(500).json({ error: 'Failed to fetch faculty', message: error.message });
  }
};

// Search faculty
export const searchFaculty = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return getAllFaculty(req, res);
    }

    const searchTerm = `%${q}%`;
    const [rows] = await pool.query(`
      SELECT f.*, d.dept_name 
      FROM faculty f 
      JOIN departments d ON f.department = d.dept_id 
      WHERE f.name LIKE ? 
         OR f.email LIKE ? 
         OR d.dept_name LIKE ?
      ORDER BY f.id
    `, [searchTerm, searchTerm, searchTerm]);
    
    res.json(rows);
  } catch (error) {
    console.error('Error searching faculty:', error);
    res.status(500).json({ error: 'Failed to search faculty', message: error.message });
  }
};

// Get faculty by ID
export const getFacultyById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(`
      SELECT f.*, d.dept_name 
      FROM faculty f 
      JOIN departments d ON f.department = d.dept_id 
      WHERE f.id = ?
    `, [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Faculty not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching faculty:', error);
    res.status(500).json({ error: 'Failed to fetch faculty', message: error.message });
  }
};

// Create new faculty
export const createFaculty = async (req, res) => {
  try {
    const { name, department, email, phone } = req.body;
    
    // Validate required fields
    if (!name || !department || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const [result] = await pool.query(`
      INSERT INTO faculty (name, department, email, phone) 
      VALUES (?, ?, ?, ?)
    `, [name, department, email, phone || null]);
    
    // Fetch the created faculty
    const [rows] = await pool.query(`
      SELECT f.*, d.dept_name 
      FROM faculty f 
      JOIN departments d ON f.department = d.dept_id 
      WHERE f.id = ?
    `, [result.insertId]);
    
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error creating faculty:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Duplicate entry: Email already exists' });
    }
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({ error: 'Invalid department ID' });
    }
    res.status(500).json({ error: 'Failed to create faculty', message: error.message });
  }
};

// Update faculty
export const updateFaculty = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, department, email, phone } = req.body;
    
    // Check if faculty exists
    const [existing] = await pool.query('SELECT id FROM faculty WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Faculty not found' });
    }

    await pool.query(`
      UPDATE faculty 
      SET name = ?, department = ?, email = ?, phone = ?
      WHERE id = ?
    `, [name, department, email, phone || null, id]);
    
    // Fetch updated faculty
    const [rows] = await pool.query(`
      SELECT f.*, d.dept_name 
      FROM faculty f 
      JOIN departments d ON f.department = d.dept_id 
      WHERE f.id = ?
    `, [id]);
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error updating faculty:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Duplicate entry: Email already exists' });
    }
    res.status(500).json({ error: 'Failed to update faculty', message: error.message });
  }
};

// Delete faculty
export const deleteFaculty = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if faculty exists
    const [existing] = await pool.query('SELECT id FROM faculty WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Faculty not found' });
    }

    await pool.query('DELETE FROM faculty WHERE id = ?', [id]);
    res.json({ message: 'Faculty deleted successfully' });
  } catch (error) {
    console.error('Error deleting faculty:', error);
    res.status(500).json({ error: 'Failed to delete faculty', message: error.message });
  }
};

