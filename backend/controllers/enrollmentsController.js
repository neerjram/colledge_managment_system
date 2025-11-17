import pool from '../config/database.js'

export const getAllEnrollments = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        e.id,
        e.student_id,
        e.course_id,
        e.enrollment_date,
        s.name AS student_name,
        s.roll_no,
        c.course_name
      FROM enrollments e
      JOIN students s ON e.student_id = s.id
      JOIN courses c ON e.course_id = c.id
      ORDER BY e.id DESC
    `)
    res.json(rows)
  } catch (error) {
    console.error('Error fetching enrollments:', error)
    res.status(500).json({ error: 'Failed to fetch enrollments', message: error.message })
  }
}

export const createEnrollment = async (req, res) => {
  try {
    const { student_id, course_id } = req.body

    if (!student_id || !course_id) {
      return res.status(400).json({ error: 'student_id and course_id are required' })
    }

    const [[student]] = await pool.query('SELECT id, name FROM students WHERE id = ?', [student_id])
    if (!student) {
      return res.status(404).json({ error: 'Student not found' })
    }

    const [[course]] = await pool.query('SELECT id, course_name FROM courses WHERE id = ?', [course_id])
    if (!course) {
      return res.status(404).json({ error: 'Course not found' })
    }

    const [existing] = await pool.query(
      'SELECT id FROM enrollments WHERE student_id = ? AND course_id = ?',
      [student_id, course_id],
    )
    if (existing.length > 0) {
      return res.status(400).json({ error: 'Student is already enrolled in this course' })
    }

    const [result] = await pool.query(
      'INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)',
      [student_id, course_id],
    )

    const [rows] = await pool.query(
      `
      SELECT 
        e.id,
        e.student_id,
        e.course_id,
        e.enrollment_date,
        s.name AS student_name,
        s.roll_no,
        c.course_name
      FROM enrollments e
      JOIN students s ON e.student_id = s.id
      JOIN courses c ON e.course_id = c.id
      WHERE e.id = ?
    `,
      [result.insertId],
    )

    res.status(201).json(rows[0])
  } catch (error) {
    console.error('Error creating enrollment:', error)
    res.status(500).json({ error: 'Failed to create enrollment', message: error.message })
  }
}

export const deleteEnrollment = async (req, res) => {
  try {
    const { id } = req.params

    const [existing] = await pool.query('SELECT id FROM enrollments WHERE id = ?', [id])
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Enrollment not found' })
    }

    await pool.query('DELETE FROM enrollments WHERE id = ?', [id])
    res.json({ message: 'Enrollment deleted successfully' })
  } catch (error) {
    console.error('Error deleting enrollment:', error)
    res.status(500).json({ error: 'Failed to delete enrollment', message: error.message })
  }
}


