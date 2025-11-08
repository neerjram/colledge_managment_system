import { useEffect, useMemo, useState } from 'react'
import { api } from '../api/client.js'
import TableComponent from '../components/TableComponent.jsx'
import { toast } from 'react-toastify'
import PageLayout from '../components/PageLayout.jsx'

export default function EnrollmentsPage() {
  const [students, setStudents] = useState([])
  const [courses, setCourses] = useState([])
  const [rows, setRows] = useState([])
  const [form, setForm] = useState({ student_id: '', course_id: '' })

  const columns = useMemo(() => [
    { header: 'Student', accessor: 'student_name' },
    { header: 'Course', accessor: 'course_name' },
  ], [])

  const fetchAll = () => {
    Promise.all([
      api.get('/students'),
      api.get('/courses'),
      api.get('/enrollments'),
    ]).then(([s, c, e]) => {
      setStudents(s.data || [])
      setCourses(c.data || [])
      setRows(e.data || [])
    }).catch(() => toast.error('Failed to load enrollments'))
  }

  useEffect(() => { fetchAll() }, [])

  const enroll = (e) => {
    e.preventDefault()
    api.post('/enrollments', form).then(() => { toast.success('Enrolled'); setForm({ student_id: '', course_id: '' }); fetchAll() })
      .catch(() => toast.error('Enroll failed'))
  }
  const onDelete = (row) => {
    api.delete(`/enrollments/${row.id || row._id}`).then(() => { toast.success('Removed'); fetchAll() })
      .catch(() => toast.error('Delete failed'))
  }

  return (
    <PageLayout title="Enrollments" actions={null}>
      <form onSubmit={enroll} className="bg-white border rounded p-4 flex flex-col sm:flex-row gap-3 items-center">
        <select className="border rounded px-3 py-2 w-full" value={form.student_id} onChange={e => setForm({ ...form, student_id: e.target.value })}>
          <option value="">Select Student</option>
          {students.map(s => <option key={s.id || s._id} value={s.id || s._id}>{s.name}</option>)}
        </select>
        <select className="border rounded px-3 py-2 w-full" value={form.course_id} onChange={e => setForm({ ...form, course_id: e.target.value })}>
          <option value="">Select Course</option>
          {courses.map(c => <option key={c.id || c._id} value={c.id || c._id}>{c.course_name}</option>)}
        </select>
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Enroll</button>
      </form>

      <TableComponent columns={columns} data={rows} renderActions={(row) => (
        <button onClick={() => onDelete(row)} className="px-2 py-1 text-sm border rounded text-red-600">Delete</button>
      )} />
    </PageLayout>
  )
}


