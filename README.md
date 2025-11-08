# College Management System

A complete frontend application for managing college operations including students, faculty, courses, departments, and enrollments.

## 🚀 Features

- **Home Dashboard** - View statistics and quick navigation
- **Student Management** - Add, edit, delete, and search students
- **Faculty Management** - Manage faculty information and assignments
- **Course Management** - Create and manage courses with faculty assignment
- **Department Management** - View departments with student and faculty counts
- **Enrollment Management** - Manage student course enrollments
- **Reports & Analytics** - Visual reports with charts (students per course, popular courses, etc.)

## 🛠️ Tech Stack

- **React 18** - Frontend framework
- **Vite** - Build tool and dev server
- **TailwindCSS** - Styling
- **React Router DOM** - Routing
- **Axios** - HTTP client
- **Recharts** - Chart library
- **React Toastify** - Notifications

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/neerjram/colledge_managment_system.git
cd colledge_managment_system
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in terminal)

## 🎯 Usage

The application uses **mock data** by default, so it works without a backend. All CRUD operations are functional with in-memory storage.

### Mock API Mode

By default, the app uses mock data (`VITE_USE_MOCKS=true`). To connect to a real backend:

1. Set `VITE_USE_MOCKS=false` in your environment
2. Ensure your backend API is running on the configured endpoint
3. Update the base URL in `src/api/axiosInstance.js` if needed

## 📁 Project Structure

```
colledge_managment_system/
├── src/
│   ├── api/
│   │   ├── axiosInstance.js    # Axios configuration
│   │   ├── client.js           # API client with mock/real switch
│   │   └── mockData.js         # Mock data and API
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation bar
│   │   ├── Sidebar.jsx         # Side navigation
│   │   ├── PageLayout.jsx      # Page layout wrapper
│   │   ├── SearchBar.jsx       # Search component
│   │   ├── TableComponent.jsx  # Reusable table
│   │   └── FormModal.jsx       # Modal for forms
│   ├── pages/
│   │   ├── HomePage.jsx        # Dashboard
│   │   ├── StudentsPage.jsx    # Student management
│   │   ├── FacultyPage.jsx     # Faculty management
│   │   ├── CoursesPage.jsx     # Course management
│   │   ├── DepartmentsPage.jsx # Department management
│   │   ├── EnrollmentsPage.jsx # Enrollment management
│   │   ├── ReportsPage.jsx     # Reports and charts
│   │   └── LoginPage.jsx       # Login page (currently disabled)
│   ├── state/
│   │   └── AuthContext.jsx     # Authentication context
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎨 Pages

1. **Home** - Dashboard with statistics and quick navigation
2. **Students** - Manage student records (name, roll_no, email, department, DOB, phone)
3. **Faculty** - Manage faculty (name, department, email, phone)
4. **Courses** - Manage courses (course_name, credits, faculty assignment)
5. **Departments** - View departments with student and faculty counts
6. **Enrollments** - Manage student-course enrollments
7. **Reports** - View analytics with charts

## 🔧 Configuration

### Environment Variables

- `VITE_USE_MOCKS` - Set to `false` to use real backend API (default: `true`)
- `VITE_REQUIRE_LOGIN` - Set to `true` to enable login requirement (default: `false`)

### API Endpoints (when using backend)

- `GET /api/dashboard` - Dashboard statistics
- `GET /api/students` - Get all students
- `POST /api/students` - Create student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student
- `GET /api/students/search?q=term` - Search students
- Similar endpoints for `/api/faculty`, `/api/courses`, `/api/departments`, `/api/enrollments`
- `GET /api/reports` - Get report data

## 📝 License

This project is part of a DBMS project.

## 👥 Contributors

- neerjram

## 📄 Status

This is the frontend application. Backend API integration is pending.
