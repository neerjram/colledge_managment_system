import { useEffect, useState } from 'react'
import { api } from '../api/client.js'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { toast } from 'react-toastify'
import PageLayout from '../components/PageLayout.jsx'

const COLORS = ['#2563eb', '#16a34a', '#f59e0b', '#ef4444', '#14b8a6']

export default function ReportsPage() {
  const [data, setData] = useState({ studentsPerCourse: [], topCourses: [], avgCoursesPerFaculty: 0 })

  useEffect(() => {
    api.get('/reports').then(res => setData(res.data || {})).catch(() => toast.error('Failed to load reports'))
  }, [])

  return (
    <PageLayout title="Reports" actions={null}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border rounded p-4">
          <h3 className="font-medium mb-3">Students per Course</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.studentsPerCourse || []}>
                <XAxis dataKey="course_name" hide={false} interval={0} angle={-20} textAnchor="end" height={60} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="student_count" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white border rounded p-4">
          <h3 className="font-medium mb-3">Top 3 Popular Courses</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data.topCourses || []} dataKey="student_count" nameKey="course_name" outerRadius={100} label>
                  {(data.topCourses || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded p-4">
        <h3 className="font-medium">Average number of courses per faculty</h3>
        <div className="text-3xl font-bold mt-2">{data.avgCoursesPerFaculty ?? '—'}</div>
      </div>
    </PageLayout>
  )
}


