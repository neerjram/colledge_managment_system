import express from 'express';
import {
  getAllDepartments,
  getDepartmentsStats,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment
} from '../controllers/departmentsController.js';

const router = express.Router();

// GET /api/departments - Get all departments
router.get('/', getAllDepartments);

// GET /api/departments/stats - Get departments with student and faculty counts
router.get('/stats', getDepartmentsStats);

// GET /api/departments/:id - Get department by ID
router.get('/:id', getDepartmentById);

// POST /api/departments - Create new department
router.post('/', createDepartment);

// PUT /api/departments/:id - Update department
router.put('/:id', updateDepartment);

// DELETE /api/departments/:id - Delete department
router.delete('/:id', deleteDepartment);

export default router;

