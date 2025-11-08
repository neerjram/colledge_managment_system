import express from 'express';
import {
  getAllStudents,
  searchStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} from '../controllers/studentsController.js';

const router = express.Router();

// GET /api/students - Get all students
router.get('/', getAllStudents);

// GET /api/students/search?q=term - Search students
router.get('/search', searchStudents);

// GET /api/students/:id - Get student by ID
router.get('/:id', getStudentById);

// POST /api/students - Create new student
router.post('/', createStudent);

// PUT /api/students/:id - Update student
router.put('/:id', updateStudent);

// DELETE /api/students/:id - Delete student
router.delete('/:id', deleteStudent);

export default router;

