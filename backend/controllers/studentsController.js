import pool from '../config/database.js';

// Get all students
export const getAllStudents = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT s.*, d.dept_name 
      FROM students s 
      JOIN departments d ON s.dept_id = d.dept_id 
      ORDER BY s.id
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Failed to fetch students', message: error.message });
  }
};

// Search students
export const searchStudents = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return getAllStudents(req, res);
    }

    const searchTerm = `%${q}%`;
    const [rows] = await pool.query(`
      SELECT s.*, d.dept_name 
      FROM students s 
      JOIN departments d ON s.dept_id = d.dept_id 
      WHERE s.name LIKE ? 
         OR s.roll_no LIKE ? 
         OR s.email LIKE ? 
         OR d.dept_name LIKE ?
      ORDER BY s.id
    `, [searchTerm, searchTerm, searchTerm, searchTerm]);
    
    res.json(rows);
  } catch (error) {
    console.error('Error searching students:', error);
    res.status(500).json({ error: 'Failed to search students', message: error.message });
  }
};

// Get student by ID
export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(`
      SELECT s.*, d.dept_name 
      FROM students s 
      JOIN departments d ON s.dept_id = d.dept_id 
      WHERE s.id = ?
    `, [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ error: 'Failed to fetch student', message: error.message });
  }
};

// Create new student
export const createStudent = async (req, res) => {
  try {
    const { name, roll_no, email, dept_id, dob, phone } = req.body;
    
    // Validate required fields
    if (!name || !roll_no || !email || !dept_id || !dob) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const [result] = await pool.query(`
      INSERT INTO students (name, roll_no, email, dept_id, dob, phone) 
      VALUES (?, ?, ?, ?, ?, ?)
    `, [name, roll_no, email, dept_id, dob, phone || null]);
    
    // Fetch the created student
    const [rows] = await pool.query(`
      SELECT s.*, d.dept_name 
      FROM students s 
      JOIN departments d ON s.dept_id = d.dept_id 
      WHERE s.id = ?
    `, [result.insertId]);
    
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error creating student:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Duplicate entry: Roll number or email already exists' });
    }
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({ error: 'Invalid department ID' });
    }
    res.status(500).json({ error: 'Failed to create student', message: error.message });
  }
};

// Update student
export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, roll_no, email, dept_id, dob, phone } = req.body;
    
    // Check if student exists
    const [existing] = await pool.query('SELECT id FROM students WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    await pool.query(`
      UPDATE students 
      SET name = ?, roll_no = ?, email = ?, dept_id = ?, dob = ?, phone = ?
      WHERE id = ?
    `, [name, roll_no, email, dept_id, dob, phone || null, id]);
    
    // Fetch updated student
    const [rows] = await pool.query(`
      SELECT s.*, d.dept_name 
      FROM students s 
      JOIN departments d ON s.dept_id = d.dept_id 
      WHERE s.id = ?
    `, [id]);
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error updating student:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Duplicate entry: Roll number or email already exists' });
    }
    res.status(500).json({ error: 'Failed to update student', message: error.message });
  }
};

// Delete student
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if student exists
    const [existing] = await pool.query('SELECT id FROM students WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    await pool.query('DELETE FROM students WHERE id = ?', [id]);
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ error: 'Failed to delete student', message: error.message });
  }
};

