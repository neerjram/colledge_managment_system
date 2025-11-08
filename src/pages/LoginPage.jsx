import { useState } from 'react'
import axios from '../api/axiosInstance.js'
import { useAuth } from '../state/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    const username = (form.username || '').trim()
    const password = (form.password || '').trim()
    const demoUser = 'demo_admin'
    const demoPass = 'demo1234'

    // Immediate demo login without hitting backend
    if (username === demoUser && password === demoPass) {
      login({ token: 'demo-token', user: { username: demoUser } })
      toast.info('Demo login active')
      navigate('/')
      return
    }

    setLoading(true)
    axios.post('/admin/login', { username, password })
      .then(res => { login(res.data); toast.success('Logged in'); navigate('/') })
      .catch(() => { toast.error('Login failed') })
      .finally(() => setLoading(false))
  }

  return (
    <div className="max-w-md mx-auto bg-white border rounded p-6">
      <h1 className="text-xl font-semibold mb-4">Admin Login</h1>
      <form onSubmit={submit} className="space-y-3">
        <input className="border rounded px-3 py-2 w-full" placeholder="Username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
        <input type="password" className="border rounded px-3 py-2 w-full" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
      </form>
      <div className="mt-3 text-xs text-gray-500">
        Demo credentials: <span className="font-mono">demo_admin</span> / <span className="font-mono">demo1234</span>
      </div>
    </div>
  )
}


