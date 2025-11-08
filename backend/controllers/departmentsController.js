import pool from '../config/database.js';

// Get all departments
export const getAllDepartments = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT * FROM departments 
      ORDER BY dept_id
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({ error: 'Failed to fetch departments', message: error.message });
  }
};

// Get departments with statistics (student count and faculty count)
export const getDepartmentsStats = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        d.dept_id,
        d.dept_name,
        COUNT(DISTINCT s.id) as student_count,
        COUNT(DISTINCT f.id) as faculty_count
      FROM departments d
      LEFT JOIN students s ON d.dept_id = s.dept_id
      LEFT JOIN faculty f ON d.dept_id = f.department
      GROUP BY d.dept_id, d.dept_name
      ORDER BY d.dept_id
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching department stats:', error);
    res.status(500).json({ error: 'Failed to fetch department statistics', message: error.message });
  }
};

// Get department by ID
export const getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(`
      SELECT * FROM departments 
      WHERE dept_id = ?
    `, [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Department not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching department:', error);
    res.status(500).json({ error: 'Failed to fetch department', message: error.message });
  }
};

// Create new department
export const createDepartment = async (req, res) => {
  try {
    const { dept_id, dept_name } = req.body;
    
    // Validate required fields
    if (!dept_id || !dept_name) {
      return res.status(400).json({ error: 'Missing required fields: dept_id and dept_name' });
    }

    await pool.query(`
      INSERT INTO departments (dept_id, dept_name) 
      VALUES (?, ?)
    `, [dept_id, dept_name]);
    
    // Fetch the created department
    const [rows] = await pool.query(`
      SELECT * FROM departments 
      WHERE dept_id = ?
    `, [dept_id]);
    
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error creating department:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Duplicate entry: Department ID already exists' });
    }
    res.status(500).json({ error: 'Failed to create department', message: error.message });
  }
};

// Update department
export const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { dept_name } = req.body;
    
    // Check if department exists
    const [existing] = await pool.query('SELECT dept_id FROM departments WHERE dept_id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Department not found' });
    }

    if (!dept_name) {
      return res.status(400).json({ error: 'dept_name is required' });
    }

    await pool.query(`
      UPDATE departments 
      SET dept_name = ?
      WHERE dept_id = ?
    `, [dept_name, id]);
    
    // Fetch updated department
    const [rows] = await pool.query(`
      SELECT * FROM departments 
      WHERE dept_id = ?
    `, [id]);
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error updating department:', error);
    res.status(500).json({ error: 'Failed to update department', message: error.message });
  }
};

// Delete department (Note: This will fail if there are students/faculty referencing it)
export const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if department exists
    const [existing] = await pool.query('SELECT dept_id FROM departments WHERE dept_id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Department not found' });
    }

    // Check if department has students or faculty
    const [students] = await pool.query('SELECT COUNT(*) as count FROM students WHERE dept_id = ?', [id]);
    const [faculty] = await pool.query('SELECT COUNT(*) as count FROM faculty WHERE department = ?', [id]);
    
    if (students[0].count > 0 || faculty[0].count > 0) {
      return res.status(400).json({ 
        error: 'Cannot delete department', 
        message: 'Department has associated students or faculty. Please remove them first.' 
      });
    }

    await pool.query('DELETE FROM departments WHERE dept_id = ?', [id]);
    res.json({ message: 'Department deleted successfully' });
  } catch (error) {
    console.error('Error deleting department:', error);
    res.status(500).json({ error: 'Failed to delete department', message: error.message });
  }
};

