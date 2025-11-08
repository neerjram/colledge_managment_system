-- Test Queries for College Management System
-- Run these queries to verify database setup is working correctly

USE college_management;

-- 1. Test: Count all records
SELECT 'Departments' as table_name, COUNT(*) as count FROM departments
UNION ALL
SELECT 'Students', COUNT(*) FROM students
UNION ALL
SELECT 'Faculty', COUNT(*) FROM faculty
UNION ALL
SELECT 'Courses', COUNT(*) FROM courses
UNION ALL
SELECT 'Enrollments', COUNT(*) FROM enrollments;

-- 2. Test: Get all students with their departments
SELECT 
    s.id,
    s.name,
    s.roll_no,
    s.email,
    d.dept_name,
    s.dob,
    s.phone
FROM students s
JOIN departments d ON s.dept_id = d.dept_id
ORDER BY s.id;

-- 3. Test: Get all faculty with their departments
SELECT 
    f.id,
    f.name,
    f.email,
    f.phone,
    d.dept_name
FROM faculty f
JOIN departments d ON f.department = d.dept_id
ORDER BY f.id;

-- 4. Test: Get all courses with assigned faculty
SELECT 
    c.id,
    c.course_name,
    c.credits,
    f.name as faculty_name,
    d.dept_name as faculty_department
FROM courses c
LEFT JOIN faculty f ON c.faculty_id = f.id
LEFT JOIN departments d ON f.department = d.dept_id
ORDER BY c.id;

-- 5. Test: Get enrollments with student and course names
SELECT 
    e.id,
    s.name as student_name,
    s.roll_no,
    c.course_name,
    e.enrollment_date
FROM enrollments e
JOIN students s ON e.student_id = s.id
JOIN courses c ON e.course_id = c.id
ORDER BY e.id;

-- 6. Test: Dashboard statistics
SELECT 
    (SELECT COUNT(*) FROM students) as total_students,
    (SELECT COUNT(*) FROM faculty) as total_faculty,
    (SELECT COUNT(*) FROM courses) as total_courses,
    (SELECT COUNT(*) FROM departments) as total_departments,
    (SELECT COUNT(*) FROM enrollments) as total_enrollments;

-- 7. Test: Departments with student and faculty counts
SELECT 
    d.dept_id,
    d.dept_name,
    COUNT(DISTINCT s.id) as student_count,
    COUNT(DISTINCT f.id) as faculty_count
FROM departments d
LEFT JOIN students s ON d.dept_id = s.dept_id
LEFT JOIN faculty f ON d.dept_id = f.department
GROUP BY d.dept_id, d.dept_name
ORDER BY d.dept_id;

-- 8. Test: Students per course
SELECT 
    c.course_name,
    COUNT(e.student_id) as student_count
FROM courses c
LEFT JOIN enrollments e ON c.id = e.course_id
GROUP BY c.id, c.course_name
ORDER BY student_count DESC;

-- 9. Test: Top 3 popular courses
SELECT 
    c.course_name,
    COUNT(e.student_id) as student_count
FROM courses c
LEFT JOIN enrollments e ON c.id = e.course_id
GROUP BY c.id, c.course_name
ORDER BY student_count DESC
LIMIT 3;

-- 10. Test: Average courses per faculty
SELECT 
    AVG(course_count) as avg_courses_per_faculty
FROM (
    SELECT 
        f.id,
        COUNT(c.id) as course_count
    FROM faculty f
    LEFT JOIN courses c ON f.id = c.faculty_id
    GROUP BY f.id
) as faculty_courses;

