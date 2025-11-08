import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Sidebar from './components/Sidebar.jsx'
import HomePage from './pages/HomePage.jsx'
import StudentsPage from './pages/StudentsPage.jsx'
import FacultyPage from './pages/FacultyPage.jsx'
import CoursesPage from './pages/CoursesPage.jsx'
import DepartmentsPage from './pages/DepartmentsPage.jsx'
import EnrollmentsPage from './pages/EnrollmentsPage.jsx'
import ReportsPage from './pages/ReportsPage.jsx'
// Public app: all routes accessible without login

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/students" element={<StudentsPage />} />
            <Route path="/faculty" element={<FacultyPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/departments" element={<DepartmentsPage />} />
            <Route path="/enrollments" element={<EnrollmentsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}


