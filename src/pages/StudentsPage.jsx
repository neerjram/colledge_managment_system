import { useEffect, useMemo, useState } from 'react'
import { api } from '../api/client.js'
import SearchBar from '../components/SearchBar.jsx'
import TableComponent from '../components/TableComponent.jsx'
import FormModal from '../components/FormModal.jsx'
import { toast } from 'react-toastify'
import PageLayout from '../components/PageLayout.jsx'

export default function StudentsPage() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ name: '', roll_no: '', email: '', dept_id: '', dob: '', phone: '' })

  const columns = useMemo(() => [
    { header: 'Name', accessor: 'name' },
    { header: 'Roll No', accessor: 'roll_no' },
    { header: 'Email', accessor: 'email' },
    { header: 'Department', accessor: 'dept_id' },
    { header: 'DOB', accessor: 'dob' },
    { header: 'Phone', accessor: 'phone' },
  ], [])

  const fetchStudents = (q) => {
    setLoading(true)
    const req = q ? api.get(`/students/search`, { params: { q } }) : api.get('/students')
    req.then(res => setStudents(res.data || []))
      .catch(() => toast.error('Failed to load students'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchStudents() }, [])

  const openAdd = () => { setEditing(null); setForm({ name: '', roll_no: '', email: '', dept_id: '', dob: '', phone: '' }); setModalOpen(true) }
  const openEdit = (row) => { setEditing(row); setForm(row); setModalOpen(true) }
  const onDelete = (row) => {
    api.delete(`/students/${row.id || row._id}`).then(() => {
      toast.success('Deleted'); fetchStudents()
    }).catch(() => toast.error('Delete failed'))
  }

  const submit = (e) => {
    e.preventDefault()
    const payload = { ...form }
    const req = editing ? api.put(`/students/${editing.id || editing._id}`, payload) : api.post('/students', payload)
    req.then(() => { toast.success('Saved'); setModalOpen(false); fetchStudents() })
      .catch(() => toast.error('Save failed'))
  }

  return (
    <PageLayout
      title="Students"
      actions={(
        <div className="flex gap-2">
          <SearchBar placeholder="Search students..." onSearch={fetchStudents} />
          <button onClick={openAdd} className="px-3 py-2 bg-blue-600 text-white rounded">Add Student</button>
        </div>
      )}
    >
      <TableComponent
        columns={columns}
        data={students}
        renderActions={(row) => (
          <div className="flex gap-2">
            <button onClick={() => openEdit(row)} className="px-2 py-1 text-sm border rounded">Edit</button>
            <button onClick={() => onDelete(row)} className="px-2 py-1 text-sm border rounded text-red-600">Delete</button>
          </div>
        )}
      />
      {loading && <div className="text-sm text-gray-500">Loading...</div>}

      <FormModal title={editing ? 'Edit Student' : 'Add Student'} isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={submit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input className="border rounded px-3 py-2" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <input className="border rounded px-3 py-2" placeholder="Roll No" value={form.roll_no} onChange={e => setForm({ ...form, roll_no: e.target.value })} />
          <input className="border rounded px-3 py-2" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <input className="border rounded px-3 py-2" placeholder="Department ID" value={form.dept_id} onChange={e => setForm({ ...form, dept_id: e.target.value })} />
          <input type="date" className="border rounded px-3 py-2" placeholder="DOB" value={form.dob} onChange={e => setForm({ ...form, dob: e.target.value })} />
          <input className="border rounded px-3 py-2" placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
        </div>
      </FormModal>
    </PageLayout>
  )
}


