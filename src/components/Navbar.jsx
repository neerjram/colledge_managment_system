import { Link } from 'react-router-dom'

export default function Navbar() {

  return (
    <header className="bg-white border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-blue-600 text-white grid place-items-center font-bold">CM</div>
          <span className="font-semibold text-lg">College Management</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link to="/reports" className="text-sm text-gray-600 hover:text-gray-900">Reports</Link>
          
        </nav>
      </div>
    </header>
  )
}


