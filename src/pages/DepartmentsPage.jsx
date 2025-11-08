import { useEffect, useMemo, useState } from 'react'
import { api } from '../api/client.js'
import TableComponent from '../components/TableComponent.jsx'
import FormModal from '../components/FormModal.jsx'
import { toast } from 'react-toastify'
import PageLayout from '../components/PageLayout.jsx'

export default function DepartmentsPage() {
  const [rows, setRows] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState({ dept_id: '', dept_name: '' })

  const columns = useMemo(() => [
    { header: 'Department ID', accessor: 'dept_id' },
    { header: 'Department Name', accessor: 'dept_name' },
    { header: 'Students', accessor: 'student_count' },
    { header: 'Faculty', accessor: 'faculty_count' },
  ], [])

  const fetchRows = () => {
    api.get('/departments/stats').then(res => setRows(res.data || []))
      .catch(() => toast.error('Failed to load departments'))
  }

  useEffect(() => { fetchRows() }, [])

  const submit = (e) => {
    e.preventDefault()
    api.post('/departments', form)
      .then(() => { toast.success('Added'); setModalOpen(false); setForm({ dept_id: '', dept_name: '' }); fetchRows() })
      .catch(() => toast.error('Add failed'))
  }

  return (
    <PageLayout
      title="Departments"
      actions={(<button onClick={() => setModalOpen(true)} className="px-3 py-2 bg-blue-600 text-white rounded">Add Department</button>)}
    >
      <TableComponent columns={columns} data={rows} />

      <FormModal title="Add Department" isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={submit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input className="border rounded px-3 py-2" placeholder="Department ID" value={form.dept_id} onChange={e => setForm({ ...form, dept_id: e.target.value })} />
          <input className="border rounded px-3 py-2" placeholder="Department Name" value={form.dept_name} onChange={e => setForm({ ...form, dept_name: e.target.value })} />
        </div>
      </FormModal>
    </PageLayout>
  )
}


