# Connect Frontend to Backend - Quick Guide

## ✅ What's Done

I've created the API endpoints for:
- ✅ **Students** - Full CRUD (Create, Read, Update, Delete)
- ✅ **Faculty** - Full CRUD
- ✅ **Courses** - Full CRUD + Faculty Assignment

All data will now be saved to the database when you add/update/delete from the frontend!

## 🚀 Setup Steps

### 1. Start the Backend Server

```bash
cd backend
npm run dev
```

The server should start on `http://localhost:3000`

### 2. Make Sure Database is Running

Ensure MySQL is running and the database is set up:
```bash
mysql -u root -p college_management < database/schema.sql
mysql -u root -p college_management < database/sample_data.sql
```

### 3. Update Frontend to Use Real API

The frontend is already configured to use the backend API. Just make sure:

1. Backend is running on `http://localhost:3000`
2. The frontend will automatically connect to the backend

### 4. Test It!

1. Start frontend: `npm run dev` (in root directory)
2. Start backend: `npm run dev` (in backend directory)
3. Open http://localhost:5173
4. Try adding a student, faculty, or course
5. Check the database - your data should be there!

## 📡 API Endpoints Available

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

## 🔍 Verify Data in Database

```sql
-- Check students
SELECT * FROM students;

-- Check faculty
SELECT * FROM faculty;

-- Check courses
SELECT * FROM courses;
```

## 🐛 Troubleshooting

### Frontend shows "Network Error"
- Make sure backend is running on port 3000
- Check CORS is enabled (it is in server.js)

### Database connection error
- Check `.env` file in backend folder has correct database credentials
- Make sure MySQL is running
- Verify database `college_management` exists

### Data not saving
- Check browser console for errors
- Check backend console for errors
- Verify database connection is working

## ✨ Next Steps

- Person 3 can now create:
  - Dashboard API
  - Departments API
  - Enrollments API
  - Reports API

