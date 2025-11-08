// Simple in-memory mock data to enable the UI without a backend

let students = [
  { id: 's1', name: 'Alice Johnson', roll_no: '2023001', email: 'alice@example.com', dept_id: 'CSE', dob: '2004-05-12', phone: '9876543210' },
  { id: 's2', name: 'Bob Smith', roll_no: '2023002', email: 'bob@example.com', dept_id: 'ECE', dob: '2003-11-03', phone: '9876543211' },
]

let faculty = [
  { id: 'f1', name: 'Dr. Rao', department: 'CSE', email: 'rao@college.edu', phone: '9876500001' },
  { id: 'f2', name: 'Dr. Mehta', department: 'ECE', email: 'mehta@college.edu', phone: '9876500002' },
]

let courses = [
  { id: 'c1', course_name: 'Data Structures', credits: 4, faculty_id: 'f1' },
  { id: 'c2', course_name: 'Digital Systems', credits: 3, faculty_id: 'f2' },
]

let departments = [
  { dept_id: 'CSE', dept_name: 'Computer Science & Engineering' },
  { dept_id: 'ECE', dept_name: 'Electronics & Communication' },
]

let enrollments = [
  { id: 'e1', student_id: 's1', course_id: 'c1' },
  { id: 'e2', student_id: 's2', course_id: 'c2' },
]

function generateId(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 8)}`
}

export const mockApi = {
  get(path, params = {}) {
    if (path === '/dashboard') {
      return {
        students: students.length,
        faculty: faculty.length,
        courses: courses.length,
        departments: departments.length,
      }
    }
    if (path === '/students') return students
    if (path === '/students/search') {
      const q = (params.q || '').toLowerCase()
      return students.filter(s => Object.values(s).some(v => String(v).toLowerCase().includes(q)))
    }
    if (path === '/faculty') return faculty
    if (path === '/faculty/search') {
      const q = (params.q || '').toLowerCase()
      return faculty.filter(f => Object.values(f).some(v => String(v).toLowerCase().includes(q)))
    }
    if (path === '/courses') return courses
    if (path === '/courses/search') {
      const q = (params.q || '').toLowerCase()
      return courses.filter(c => Object.values(c).some(v => String(v).toLowerCase().includes(q)))
    }
    if (path === '/departments') return departments
    if (path === '/departments/stats') {
      return departments.map(d => ({
        dept_id: d.dept_id,
        dept_name: d.dept_name,
        student_count: students.filter(s => s.dept_id === d.dept_id).length,
        faculty_count: faculty.filter(f => f.department === d.dept_id).length,
      }))
    }
    if (path === '/enrollments') {
      return enrollments.map(e => ({
        ...e,
        student_name: (students.find(s => s.id === e.student_id) || {}).name,
        course_name: (courses.find(c => c.id === e.course_id) || {}).course_name,
      }))
    }
    if (path === '/reports') {
      const byCourse = courses.map(c => ({
        course_name: c.course_name,
        student_count: enrollments.filter(e => e.course_id === c.id).length,
      }))
      const topCourses = [...byCourse].sort((a,b)=>b.student_count-a.student_count).slice(0,3)
      const avgCoursesPerFaculty = courses.length / Math.max(1, faculty.length)
      return { studentsPerCourse: byCourse, topCourses, avgCoursesPerFaculty: Number(avgCoursesPerFaculty.toFixed(2)) }
    }
    return null
  },
  post(path, body) {
    if (path === '/students') {
      const row = { id: generateId('s'), ...body }
      students.push(row)
      return row
    }
    if (path === '/faculty') {
      const row = { id: generateId('f'), ...body }
      faculty.push(row)
      return row
    }
    if (path === '/courses') {
      const row = { id: generateId('c'), ...body }
      courses.push(row)
      return row
    }
    if (path === '/courses/assign') {
      const { course_id, faculty_id } = body
      const c = courses.find(c => c.id === course_id)
      if (c) c.faculty_id = faculty_id
      return { ok: true }
    }
    if (path === '/departments') {
      const row = { ...body }
      departments.push(row)
      return row
    }
    if (path === '/enrollments') {
      const row = { id: generateId('e'), ...body }
      enrollments.push(row)
      return row
    }
    return { ok: true }
  },
  put(path, body) {
    if (path.startsWith('/students/')) {
      const id = path.split('/').pop()
      students = students.map(s => s.id === id ? { ...s, ...body } : s)
      return { ok: true }
    }
    if (path.startsWith('/faculty/')) {
      const id = path.split('/').pop()
      faculty = faculty.map(f => f.id === id ? { ...f, ...body } : f)
      return { ok: true }
    }
    if (path.startsWith('/courses/')) {
      const id = path.split('/').pop()
      courses = courses.map(c => c.id === id ? { ...c, ...body } : c)
      return { ok: true }
    }
    return { ok: true }
  },
  delete(path) {
    if (path.startsWith('/students/')) {
      const id = path.split('/').pop()
      students = students.filter(s => s.id !== id)
      enrollments = enrollments.filter(e => e.student_id !== id)
      return { ok: true }
    }
    if (path.startsWith('/faculty/')) {
      const id = path.split('/').pop()
      faculty = faculty.filter(f => f.id !== id)
      courses = courses.map(c => c.faculty_id === id ? { ...c, faculty_id: '' } : c)
      return { ok: true }
    }
    if (path.startsWith('/courses/')) {
      const id = path.split('/').pop()
      courses = courses.filter(c => c.id !== id)
      enrollments = enrollments.filter(e => e.course_id !== id)
      return { ok: true }
    }
    if (path.startsWith('/enrollments/')) {
      const id = path.split('/').pop()
      enrollments = enrollments.filter(e => e.id !== id)
      return { ok: true }
    }
    return { ok: true }
  }
}


