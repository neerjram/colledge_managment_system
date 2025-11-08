import pool from '../config/database.js';

// Get all courses
export const getAllCourses = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT c.*, f.name as faculty_name, f.email as faculty_email
      FROM courses c 
      LEFT JOIN faculty f ON c.faculty_id = f.id 
      ORDER BY c.id
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Failed to fetch courses', message: error.message });
  }
};

// Search courses
export const searchCourses = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return getAllCourses(req, res);
    }

    const searchTerm = `%${q}%`;
    const [rows] = await pool.query(`
      SELECT c.*, f.name as faculty_name, f.email as faculty_email
      FROM courses c 
      LEFT JOIN faculty f ON c.faculty_id = f.id 
      WHERE c.course_name LIKE ? 
         OR f.name LIKE ?
      ORDER BY c.id
    `, [searchTerm, searchTerm]);
    
    res.json(rows);
  } catch (error) {
    console.error('Error searching courses:', error);
    res.status(500).json({ error: 'Failed to search courses', message: error.message });
  }
};

// Get course by ID
export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(`
      SELECT c.*, f.name as faculty_name, f.email as faculty_email
      FROM courses c 
      LEFT JOIN faculty f ON c.faculty_id = f.id 
      WHERE c.id = ?
    `, [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ error: 'Failed to fetch course', message: error.message });
  }
};

// Create new course
export const createCourse = async (req, res) => {
  try {
    const { course_name, credits, faculty_id } = req.body;
    
    // Validate required fields
    if (!course_name || !credits) {
      return res.status(400).json({ error: 'Missing required fields: course_name and credits' });
    }

    const [result] = await pool.query(`
      INSERT INTO courses (course_name, credits, faculty_id) 
      VALUES (?, ?, ?)
    `, [course_name, credits, faculty_id || null]);
    
    // Fetch the created course
    const [rows] = await pool.query(`
      SELECT c.*, f.name as faculty_name, f.email as faculty_email
      FROM courses c 
      LEFT JOIN faculty f ON c.faculty_id = f.id 
      WHERE c.id = ?
    `, [result.insertId]);
    
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error creating course:', error);
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({ error: 'Invalid faculty ID' });
    }
    res.status(500).json({ error: 'Failed to create course', message: error.message });
  }
};

// Update course
export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { course_name, credits, faculty_id } = req.body;
    
    // Check if course exists
    const [existing] = await pool.query('SELECT id FROM courses WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }

    await pool.query(`
      UPDATE courses 
      SET course_name = ?, credits = ?, faculty_id = ?
      WHERE id = ?
    `, [course_name, credits, faculty_id || null, id]);
    
    // Fetch updated course
    const [rows] = await pool.query(`
      SELECT c.*, f.name as faculty_name, f.email as faculty_email
      FROM courses c 
      LEFT JOIN faculty f ON c.faculty_id = f.id 
      WHERE c.id = ?
    `, [id]);
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error updating course:', error);
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({ error: 'Invalid faculty ID' });
    }
    res.status(500).json({ error: 'Failed to update course', message: error.message });
  }
};

// Delete course
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if course exists
    const [existing] = await pool.query('SELECT id FROM courses WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }

    await pool.query('DELETE FROM courses WHERE id = ?', [id]);
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ error: 'Failed to delete course', message: error.message });
  }
};

// Assign faculty to course
export const assignFaculty = async (req, res) => {
  try {
    const { course_id, faculty_id } = req.body;
    
    if (!course_id) {
      return res.status(400).json({ error: 'course_id is required' });
    }

    // Check if course exists
    const [course] = await pool.query('SELECT id FROM courses WHERE id = ?', [course_id]);
    if (course.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // If faculty_id is provided, check if it exists
    if (faculty_id) {
      const [faculty] = await pool.query('SELECT id FROM faculty WHERE id = ?', [faculty_id]);
      if (faculty.length === 0) {
        return res.status(404).json({ error: 'Faculty not found' });
      }
    }

    await pool.query(`
      UPDATE courses 
      SET faculty_id = ?
      WHERE id = ?
    `, [faculty_id || null, course_id]);
    
    // Fetch updated course
    const [rows] = await pool.query(`
      SELECT c.*, f.name as faculty_name, f.email as faculty_email
      FROM courses c 
      LEFT JOIN faculty f ON c.faculty_id = f.id 
      WHERE c.id = ?
    `, [course_id]);
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error assigning faculty:', error);
    res.status(500).json({ error: 'Failed to assign faculty', message: error.message });
  }
};

