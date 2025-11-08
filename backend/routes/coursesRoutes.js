import express from 'express';
import {
  getAllCourses,
  searchCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  assignFaculty
} from '../controllers/coursesController.js';

const router = express.Router();

// GET /api/courses - Get all courses
router.get('/', getAllCourses);

// GET /api/courses/search?q=term - Search courses
router.get('/search', searchCourses);

// GET /api/courses/:id - Get course by ID
router.get('/:id', getCourseById);

// POST /api/courses - Create new course
router.post('/', createCourse);

// PUT /api/courses/:id - Update course
router.put('/:id', updateCourse);

// DELETE /api/courses/:id - Delete course
router.delete('/:id', deleteCourse);

// POST /api/courses/assign - Assign faculty to course
router.post('/assign', assignFaculty);

export default router;

