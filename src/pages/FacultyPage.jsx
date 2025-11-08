import { useEffect, useMemo, useState } from 'react'
import { api } from '../api/client.js'
import SearchBar from '../components/SearchBar.jsx'
import TableComponent from '../components/TableComponent.jsx'
import FormModal from '../components/FormModal.jsx'
import { toast } from 'react-toastify'
import PageLayout from '../components/PageLayout.jsx'

export default function FacultyPage() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ name: '', department: '', email: '', phone: '' })

  const columns = useMemo(() => [
    { header: 'Name', accessor: 'name' },
    { header: 'Department', accessor: 'department' },
    { header: 'Email', accessor: 'email' },
    { header: 'Phone', accessor: 'phone' },
  ], [])

  const fetchRows = (q) => {
    setLoading(true)
    const req = q ? api.get('/faculty/search', { params: { q } }) : api.get('/faculty')
    req.then(res => setRows(res.data || []))
      .catch(() => toast.error('Failed to load faculty'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchRows() }, [])

  const openAdd = () => { setEditing(null); setForm({ name: '', department: '', email: '', phone: '' }); setModalOpen(true) }
  const openEdit = (row) => { setEditing(row); setForm(row); setModalOpen(true) }
  const onDelete = (row) => {
    api.delete(`/faculty/${row.id || row._id}`).then(() => { toast.success('Deleted'); fetchRows() })
      .catch(() => toast.error('Delete failed'))
  }
  const submit = (e) => {
    e.preventDefault()
    const req = editing ? api.put(`/faculty/${editing.id || editing._id}`, form) : api.post('/faculty', form)
    req.then(() => { toast.success('Saved'); setModalOpen(false); fetchRows() }).catch(() => toast.error('Save failed'))
  }

  return (
    <PageLayout
      title="Faculty"
      actions={(
        <div className="flex gap-2">
          <SearchBar placeholder="Search faculty..." onSearch={fetchRows} />
          <button onClick={openAdd} className="px-3 py-2 bg-blue-600 text-white rounded">Add Faculty</button>
        </div>
      )}
    >
      <TableComponent columns={columns} data={rows} renderActions={(row) => (
        <div className="flex gap-2">
          <button onClick={() => openEdit(row)} className="px-2 py-1 text-sm border rounded">Edit</button>
          <button onClick={() => onDelete(row)} className="px-2 py-1 text-sm border rounded text-red-600">Delete</button>
        </div>
      )} />
      {loading && <div className="text-sm text-gray-500">Loading...</div>}

      <FormModal title={editing ? 'Edit Faculty' : 'Add Faculty'} isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={submit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input className="border rounded px-3 py-2" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <input className="border rounded px-3 py-2" placeholder="Department" value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} />
          <input className="border rounded px-3 py-2" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <input className="border rounded px-3 py-2" placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
        </div>
      </FormModal>
    </PageLayout>
  )
}


