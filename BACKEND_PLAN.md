# Backend & Database Development Plan

## 📋 Project Overview

This document outlines the complete plan for building the backend API and SQL database for the College Management System.

**Repository:** https://github.com/neerjram/colledge_managment_system

---

## 🏗️ Architecture Overview

```
┌─────────────────┐
│   React Frontend │
│   (Port 5173)    │
└────────┬─────────┘
         │ HTTP/REST API
         │
┌────────▼─────────┐
│  Backend Server  │
│  (Node.js/Express)│
│   (Port 3000)     │
└────────┬─────────┘
         │ SQL Queries
         │
┌────────▼─────────┐
│  SQL Database    │
│  (MySQL/PostgreSQL)│
│   (Port 3306/5432)│
└──────────────────┘
```

---

## 📊 Development Flowchart

```
START
  │
  ├─► [Phase 1: Database Design]
  │     │
  │     ├─► Design ER Diagram
  │     ├─► Create Database Schema
  │     ├─► Create Tables (students, faculty, courses, departments, enrollments)
  │     ├─► Add Foreign Keys & Constraints
  │     ├─► Insert Sample Data
  │     └─► Test Queries (SELECT, INSERT, UPDATE, DELETE)
  │
  ├─► [Phase 2: Backend Setup]
  │     │
  │     ├─► Initialize Node.js Project
  │     ├─► Install Dependencies (express, mysql2/pg, cors, dotenv)
  │     ├─► Setup Project Structure
  │     ├─► Configure Database Connection
  │     ├─► Setup Environment Variables
  │     └─► Create Basic Server
  │
  ├─► [Phase 3: API Development]
  │     │
  │     ├─► Dashboard Route (/api/dashboard)
  │     ├─► Students CRUD (/api/students)
  │     ├─► Faculty CRUD (/api/faculty)
  │     ├─► Courses CRUD (/api/courses)
  │     ├─► Departments CRUD (/api/departments)
  │     ├─► Enrollments CRUD (/api/enrollments)
  │     └─► Reports Route (/api/reports)
  │
  ├─► [Phase 4: Testing & Integration]
  │     │
  │     ├─► Test All API Endpoints
  │     ├─► Test Database Queries
  │     ├─► Connect Frontend to Backend
  │     ├─► Test Full CRUD Operations
  │     ├─► Test Search Functionality
  │     └─► Test Reports & Analytics
  │
  └─► [Phase 5: Deployment]
        │
        ├─► Deploy Database (Cloud SQL / Local)
        ├─► Deploy Backend (Heroku / Railway / Vercel)
        ├─► Update Frontend API URLs
        └─► Final Testing

END
```

---

## 🗄️ Database Schema Design

### ER Diagram (Text Representation)

```
┌─────────────┐         ┌──────────────┐
│  Departments│         │   Students   │
├─────────────┤         ├──────────────┤
│ dept_id (PK)│◄────┐   │ id (PK)      │
│ dept_name   │     │   │ name         │
└─────────────┘     │   │ roll_no      │
                    │   │ email        │
┌─────────────┐     │   │ dept_id (FK) │
│   Faculty   │     │   │ dob          │
├─────────────┤     │   │ phone        │
│ id (PK)     │     │   └──────────────┘
│ name        │     │
│ department  │     │   ┌──────────────┐
│ email       │     │   │   Courses    │
│ phone       │     │   ├──────────────┤
└─────────────┘     │   │ id (PK)      │
                    │   │ course_name  │
┌─────────────┐     │   │ credits      │
│  Enrollments│     │   │ faculty_id(FK)│
├─────────────┤     │   └──────────────┘
│ id (PK)     │     │
│ student_id  │─────┘
│ course_id   │─────┘
└─────────────┘
```

### SQL Tables

#### 1. Departments Table
```sql
CREATE TABLE departments (
    dept_id VARCHAR(10) PRIMARY KEY,
    dept_name VARCHAR(100) NOT NULL
);
```

#### 2. Students Table
```sql
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    roll_no VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    dept_id VARCHAR(10) NOT NULL,
    dob DATE NOT NULL,
    phone VARCHAR(15),
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);
```

#### 3. Faculty Table
```sql
CREATE TABLE faculty (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(10) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    FOREIGN KEY (department) REFERENCES departments(dept_id)
);
```

#### 4. Courses Table
```sql
CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL,
    credits INT NOT NULL,
    faculty_id INT,
    FOREIGN KEY (faculty_id) REFERENCES faculty(id)
);
```

#### 5. Enrollments Table
```sql
CREATE TABLE enrollments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    enrollment_date DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE KEY unique_enrollment (student_id, course_id)
);
```

---


## 🔧 Backend Technology Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MySQL or PostgreSQL
- **ORM/Query Builder:** mysql2 or pg (native SQL)
- **Environment:** dotenv
- **CORS:** cors middleware

---

## 📁 Backend Project Structure

```
backend/
├── config/
│   └── database.js          # Database connection
├── controllers/
│   ├── dashboardController.js
│   ├── studentsController.js
│   ├── facultyController.js
│   ├── coursesController.js
│   ├── departmentsController.js
│   ├── enrollmentsController.js
│   └── reportsController.js
├── routes/
│   ├── dashboardRoutes.js
│   ├── studentsRoutes.js
│   ├── facultyRoutes.js
│   ├── coursesRoutes.js
│   ├── departmentsRoutes.js
│   ├── enrollmentsRoutes.js
│   └── reportsRoutes.js
├── middleware/
│   └── errorHandler.js
├── models/
│   └── queries.js           # SQL queries
├── utils/
│   └── helpers.js
├── .env
├── .gitignore
├── package.json
└── server.js                # Entry point
```

---

## 🔌 API Endpoints Specification

### Dashboard
- `GET /api/dashboard` - Get statistics

### Students
- `GET /api/students` - Get all students
- `GET /api/students/search?q=term` - Search students
- `POST /api/students` - Create student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Faculty
- `GET /api/faculty` - Get all faculty
- `GET /api/faculty/search?q=term` - Search faculty
- `POST /api/faculty` - Create faculty
- `PUT /api/faculty/:id` - Update faculty
- `DELETE /api/faculty/:id` - Delete faculty

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/search?q=term` - Search courses
- `POST /api/courses` - Create course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course
- `POST /api/courses/assign` - Assign faculty to course

### Departments
- `GET /api/departments` - Get all departments
- `GET /api/departments/stats` - Get departments with counts
- `POST /api/departments` - Create department

### Enrollments
- `GET /api/enrollments` - Get all enrollments (with JOIN)
- `POST /api/enrollments` - Create enrollment
- `DELETE /api/enrollments/:id` - Delete enrollment

### Reports
- `GET /api/reports` - Get analytics data
  - Students per course (GROUP BY, COUNT)
  - Top 3 popular courses (ORDER BY, LIMIT)
  - Average courses per faculty (AVG, COUNT)

---

## 👥 Task Division for 3 Team Members

### 👤 **Person 1: Database & Backend Setup**

**Responsibilities:**
1. ✅ Database Design & Setup
   - Create ER diagram
   - Write SQL schema (all tables)
   - Set up MySQL/PostgreSQL database
   - Create tables with foreign keys
   - Insert sample/test data
   - Test all SQL queries manually

2. ✅ Backend Project Setup
   - Initialize Node.js project
   - Install all dependencies
   - Setup project folder structure
   - Configure database connection
   - Setup environment variables (.env)
   - Create basic Express server
   - Setup CORS middleware

**Deliverables:**
- Database schema SQL file
- Database connection working
- Basic server running

---

### 👤 **Person 2: Core CRUD APIs**

**Responsibilities:**
1. ✅ Students API
   - GET /api/students (all students)
   - GET /api/students/search (search functionality)
   - POST /api/students (create)
   - PUT /api/students/:id (update)
   - DELETE /api/students/:id (delete)

2. ✅ Faculty API
   - GET /api/faculty (all faculty)
   - GET /api/faculty/search (search)
   - POST /api/faculty (create)
   - PUT /api/faculty/:id (update)
   - DELETE /api/faculty/:id (delete)

3. ✅ Courses API
   - GET /api/courses (all courses)
   - GET /api/courses/search (search)
   - POST /api/courses (create)
   - PUT /api/courses/:id (update)
   - DELETE /api/courses/:id (delete)
   - POST /api/courses/assign (assign faculty)

4. ✅ Departments API
   - GET /api/departments (all departments)
   - GET /api/departments/stats (with counts using JOIN, GROUP BY, COUNT)

**Deliverables:**
- All CRUD endpoints working
- Search functionality working
- All endpoints tested with Postman/Thunder Client

---

### 👤 **Person 3: Enrollments, Reports & Integration**

**Responsibilities:**
1. ✅ Enrollments API
   - GET /api/enrollments (with JOIN to get student names and course names)
   - POST /api/enrollments (create enrollment)
   - DELETE /api/enrollments/:id (delete enrollment)
   - Handle many-to-many relationship

2. ✅ Dashboard API
   - GET /api/dashboard
   - Return counts: students, faculty, courses, departments
   - Use SQL COUNT() queries

3. ✅ Reports API
   - GET /api/reports
   - Students per course (JOIN enrollments + courses, GROUP BY, COUNT)
   - Top 3 popular courses (ORDER BY enrollment count DESC, LIMIT 3)
   - Average courses per faculty (AVG, COUNT with GROUP BY)

4. ✅ Frontend Integration
   - Update frontend to use real API (set VITE_USE_MOCKS=false)
   - Test all pages with backend
   - Fix any integration issues

**Deliverables:**
- Enrollments API working
- Dashboard API working
- Reports API with all analytics
- Frontend fully connected to backend

---

## 📅 Development Timeline (Suggested)

### Week 1
- **Day 1-2:** Person 1 - Database design & setup
- **Day 3-4:** Person 1 - Backend setup & basic server
- **Day 5:** All - Review & testing

### Week 2
- **Day 1-3:** Person 2 - Students & Faculty APIs
- **Day 4-5:** Person 2 - Courses & Departments APIs

### Week 3
- **Day 1-2:** Person 3 - Enrollments API
- **Day 3:** Person 3 - Dashboard API
- **Day 4-5:** Person 3 - Reports API

### Week 4
- **Day 1-3:** Person 3 - Frontend integration
- **Day 4-5:** All - Testing, bug fixes, documentation

---

## 🧪 Testing Checklist

### Database Testing
- [ ] All tables created successfully
- [ ] Foreign keys working
- [ ] Sample data inserted
- [ ] SELECT queries return correct data
- [ ] INSERT, UPDATE, DELETE work correctly

### API Testing
- [ ] All endpoints return correct status codes
- [ ] CRUD operations working
- [ ] Search functionality working
- [ ] JOIN queries returning correct data
- [ ] Reports returning correct analytics

### Integration Testing
- [ ] Frontend can connect to backend
- [ ] All pages load data correctly
- [ ] Forms submit successfully
- [ ] Search works from frontend
- [ ] Charts display correct data

---

## 📝 SQL Query Examples

### Dashboard Statistics
```sql
SELECT 
    (SELECT COUNT(*) FROM students) as students,
    (SELECT COUNT(*) FROM faculty) as faculty,
    (SELECT COUNT(*) FROM courses) as courses,
    (SELECT COUNT(*) FROM departments) as departments;
```

### Departments with Stats
```sql
SELECT 
    d.dept_id,
    d.dept_name,
    COUNT(DISTINCT s.id) as student_count,
    COUNT(DISTINCT f.id) as faculty_count
FROM departments d
LEFT JOIN students s ON d.dept_id = s.dept_id
LEFT JOIN faculty f ON d.dept_id = f.department
GROUP BY d.dept_id, d.dept_name;
```

### Students per Course
```sql
SELECT 
    c.course_name,
    COUNT(e.student_id) as student_count
FROM courses c
LEFT JOIN enrollments e ON c.id = e.course_id
GROUP BY c.id, c.course_name;
```

### Top 3 Popular Courses
```sql
SELECT 
    c.course_name,
    COUNT(e.student_id) as student_count
FROM courses c
LEFT JOIN enrollments e ON c.id = e.course_id
GROUP BY c.id, c.course_name
ORDER BY student_count DESC
LIMIT 3;
```

### Average Courses per Faculty
```sql
SELECT 
    AVG(course_count) as avg_courses_per_faculty
FROM (
    SELECT 
        f.id,
        COUNT(c.id) as course_count
    FROM faculty f
    LEFT JOIN courses c ON f.id = c.faculty_id
    GROUP BY f.id
) as faculty_courses;
```

### Enrollments with Student and Course Names
```sql
SELECT 
    e.id,
    s.name as student_name,
    c.course_name
FROM enrollments e
JOIN students s ON e.student_id = s.id
JOIN courses c ON e.course_id = c.id;
```

---

## 🚀 Getting Started

### For Person 1 (Database Setup)

1. Install MySQL or PostgreSQL
2. Create database:
   ```sql
   CREATE DATABASE college_management;
   USE college_management;
   ```
3. Run all CREATE TABLE statements
4. Insert sample data

### For Person 2 & 3 (Backend Development)

1. Clone the repository
2. Create `backend` folder in project root
3. Initialize Node.js:
   ```bash
   cd backend
   npm init -y
   npm install express mysql2 cors dotenv
   ```
4. Start development!

---

## 📞 Communication & Collaboration

- Use GitHub Issues for task tracking
- Create feature branches for each task
- Use Pull Requests for code review
- Daily standup meetings (15 mins)
- Share progress updates in team chat

---

## ✅ Success Criteria

- ✅ All database tables created and working
- ✅ All API endpoints implemented and tested
- ✅ Frontend successfully connected to backend
- ✅ All CRUD operations working
- ✅ Search functionality working
- ✅ Reports showing correct analytics
- ✅ No critical bugs
- ✅ Code documented

---

**Good luck with your backend development! 🚀**

