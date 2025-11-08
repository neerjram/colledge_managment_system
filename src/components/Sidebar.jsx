import { NavLink } from 'react-router-dom'

const linkClass = ({ isActive }) =>
  `block px-4 py-2 rounded hover:bg-gray-100 ${isActive ? 'bg-gray-100 font-medium' : ''}`

export default function Sidebar() {
  return (
    <aside className="hidden md:block w-64 border-r bg-white">
      <div className="p-4 text-xs uppercase text-gray-500">Navigation</div>
      <nav className="space-y-1 p-2">
        <NavLink to="/" className={linkClass}>Home</NavLink>
        <NavLink to="/students" className={linkClass}>Students</NavLink>
        <NavLink to="/faculty" className={linkClass}>Faculty</NavLink>
        <NavLink to="/courses" className={linkClass}>Courses</NavLink>
        <NavLink to="/departments" className={linkClass}>Departments</NavLink>
        <NavLink to="/enrollments" className={linkClass}>Enrollments</NavLink>
        <NavLink to="/reports" className={linkClass}>Reports</NavLink>
      </nav>
    </aside>
  )
}



