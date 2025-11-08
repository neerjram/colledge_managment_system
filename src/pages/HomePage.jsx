import { useEffect, useState } from 'react'
import { api } from '../api/client.js'
import PageLayout from '../components/PageLayout.jsx'
import { Link } from 'react-router-dom'

export default function HomePage() {
  const [stats, setStats] = useState({ students: 0, faculty: 0, courses: 0, departments: 0 })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    api.get('/dashboard').then(res => setStats(res.data)).catch(() => {}).finally(() => setLoading(false))
  }, [])

  return (
    <PageLayout title="Welcome to College Management" actions={null}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Students', value: stats.students },
          { label: 'Faculty', value: stats.faculty },
          { label: 'Courses', value: stats.courses },
          { label: 'Departments', value: stats.departments },
        ].map((c) => (
          <div key={c.label} className="bg-white border rounded p-4">
            <div className="text-sm text-gray-500">{c.label}</div>
            <div className="text-2xl font-bold">{loading ? '—' : c.value}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { to: '/students', label: 'Students' },
          { to: '/faculty', label: 'Faculty' },
          { to: '/courses', label: 'Courses' },
          { to: '/departments', label: 'Departments' },
          { to: '/enrollments', label: 'Enrollments' },
          { to: '/reports', label: 'Reports' },
        ].map((b) => (
          <Link key={b.to} to={b.to} className="px-3 py-2 text-center rounded border bg-white hover:bg-gray-50">
            {b.label}
          </Link>
        ))}
      </div>
    </PageLayout>
  )
}


