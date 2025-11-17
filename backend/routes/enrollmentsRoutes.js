import express from 'express'
import {
  getAllEnrollments,
  createEnrollment,
  deleteEnrollment,
} from '../controllers/enrollmentsController.js'

const router = express.Router()

router.get('/', getAllEnrollments)
router.post('/', createEnrollment)
router.delete('/:id', deleteEnrollment)

export default router


