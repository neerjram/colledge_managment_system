import express from 'express';
import {
  getAllFaculty,
  searchFaculty,
  getFacultyById,
  createFaculty,
  updateFaculty,
  deleteFaculty
} from '../controllers/facultyController.js';

const router = express.Router();

// GET /api/faculty - Get all faculty
router.get('/', getAllFaculty);

// GET /api/faculty/search?q=term - Search faculty
router.get('/search', searchFaculty);

// GET /api/faculty/:id - Get faculty by ID
router.get('/:id', getFacultyById);

// POST /api/faculty - Create new faculty
router.post('/', createFaculty);

// PUT /api/faculty/:id - Update faculty
router.put('/:id', updateFaculty);

// DELETE /api/faculty/:id - Delete faculty
router.delete('/:id', deleteFaculty);

export default router;

