import pool from '../config/database.js'

export const getReports = async (req, res) => {
  try {
    const studentsPerCoursePromise = pool.query(`
      SELECT 
        c.course_name,
        COUNT(e.student_id) AS student_count
      FROM courses c
      LEFT JOIN enrollments e ON c.id = e.course_id
      GROUP BY c.id, c.course_name
      ORDER BY c.course_name
    `)

    const topCoursesPromise = pool.query(`
      SELECT 
        c.course_name,
        COUNT(e.student_id) AS student_count
      FROM courses c
      LEFT JOIN enrollments e ON c.id = e.course_id
      GROUP BY c.id, c.course_name
      ORDER BY student_count DESC
      LIMIT 3
    `)

    const avgCoursesPerFacultyPromise = pool.query(`
      SELECT 
        AVG(course_count) AS avg_courses_per_faculty
      FROM (
        SELECT 
          f.id,
          COUNT(c.id) AS course_count
        FROM faculty f
        LEFT JOIN courses c ON f.id = c.faculty_id
        GROUP BY f.id
      ) AS faculty_courses
    `)

    const [[studentsPerCourse], [topCourses], [avgCoursesPerFaculty]] = await Promise.all([
      studentsPerCoursePromise,
      topCoursesPromise,
      avgCoursesPerFacultyPromise,
    ])

    res.json({
      studentsPerCourse,
      topCourses,
      avgCoursesPerFaculty: Number(avgCoursesPerFaculty[0].avg_courses_per_faculty || 0),
    })
  } catch (error) {
    console.error('Error fetching reports:', error)
    res.status(500).json({ error: 'Failed to fetch reports', message: error.message })
  }
}


