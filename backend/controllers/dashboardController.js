import pool from '../config/database.js'

export const getDashboardStats = async (req, res) => {
  try {
    const queries = [
      pool.query('SELECT COUNT(*) AS total FROM students'),
      pool.query('SELECT COUNT(*) AS total FROM faculty'),
      pool.query('SELECT COUNT(*) AS total FROM courses'),
      pool.query('SELECT COUNT(*) AS total FROM departments'),
    ]

    const [[students], [faculty], [courses], [departments]] = await Promise.all(queries)

    res.json({
      students: students[0].total,
      faculty: faculty[0].total,
      courses: courses[0].total,
      departments: departments[0].total,
    })
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    res.status(500).json({ error: 'Failed to fetch dashboard stats', message: error.message })
  }
}


