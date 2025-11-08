import { useEffect, useMemo, useState } from 'react'
import { api } from '../api/client.js'
import SearchBar from '../components/SearchBar.jsx'
import TableComponent from '../components/TableComponent.jsx'
import FormModal from '../components/FormModal.jsx'
import { toast } from 'react-toastify'
import PageLayout from '../components/PageLayout.jsx'

export default function CoursesPage() {
  const [rows, setRows] = useState([])
  const [faculty, setFaculty] = useState([])
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ course_name: '', credits: '', faculty_id: '' })

  const columns = useMemo(() => [
    { header: 'Course', accessor: 'course_name' },
    { header: 'Credits', accessor: 'credits' },
    { header: 'Faculty', accessor: 'faculty_id' },
  ], [])

  const fetchRows = (q) => {
    setLoading(true)
    const req = q ? api.get('/courses/search', { params: { q } }) : api.get('/courses')
    req.then(res => setRows(res.data || []))
      .catch(() => toast.error('Failed to load courses'))
      .finally(() => setLoading(false))
  }

  const fetchFaculty = () => api.get('/faculty').then(res => setFaculty(res.data || []))

  useEffect(() => { fetchRows(); fetchFaculty() }, [])

  const openAdd = () => { setEditing(null); setForm({ course_name: '', credits: '', faculty_id: '' }); setModalOpen(true) }
  const openEdit = (row) => { setEditing(row); setForm(row); setModalOpen(true) }
  const onDelete = (row) => {
    api.delete(`/courses/${row.id || row._id}`).then(() => { toast.success('Deleted'); fetchRows() })
      .catch(() => toast.error('Delete failed'))
  }
  const submit = (e) => {
    e.preventDefault()
    const req = editing ? api.put(`/courses/${editing.id || editing._id}`, form) : api.post('/courses', form)
    req.then(() => { toast.success('Saved'); setModalOpen(false); fetchRows() }).catch(() => toast.error('Save failed'))
  }
  const assignFaculty = (courseId, facultyId) => {
    api.post('/courses/assign', { course_id: courseId, faculty_id: facultyId })
      .then(() => { toast.success('Faculty assigned'); fetchRows() })
      .catch(() => toast.error('Assign failed'))
  }

  return (
    <PageLayout
      title="Courses"
      actions={(
        <div className="flex gap-2">
          <SearchBar placeholder="Search courses..." onSearch={fetchRows} />
          <button onClick={openAdd} className="px-3 py-2 bg-blue-600 text-white rounded">Add Course</button>
        </div>
      )}
    >
      <TableComponent columns={columns} data={rows} renderActions={(row) => (
        <div className="flex gap-2 items-center">
          <select value={row.faculty_id || ''} onChange={(e) => assignFaculty(row.id || row._id, e.target.value)} className="border rounded px-2 py-1 text-sm">
            <option value="">Assign Faculty</option>
            {faculty.map(f => <option key={f.id || f._id} value={f.id || f._id}>{f.name}</option>)}
          </select>
          <button onClick={() => openEdit(row)} className="px-2 py-1 text-sm border rounded">Edit</button>
          <button onClick={() => onDelete(row)} className="px-2 py-1 text-sm border rounded text-red-600">Delete</button>
        </div>
      )} />
      {loading && <div className="text-sm text-gray-500">Loading...</div>}

      <FormModal title={editing ? 'Edit Course' : 'Add Course'} isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={submit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input className="border rounded px-3 py-2" placeholder="Course Name" value={form.course_name} onChange={e => setForm({ ...form, course_name: e.target.value })} />
          <input className="border rounded px-3 py-2" placeholder="Credits" value={form.credits} onChange={e => setForm({ ...form, credits: e.target.value })} />
          <select className="border rounded px-3 py-2" value={form.faculty_id} onChange={e => setForm({ ...form, faculty_id: e.target.value })}>
            <option value="">Select Faculty</option>
            {faculty.map(f => <option key={f.id || f._id} value={f.id || f._id}>{f.name}</option>)}
          </select>
        </div>
      </FormModal>
    </PageLayout>
  )
}


