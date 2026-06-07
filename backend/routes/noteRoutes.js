import express from 'express';
import { addNote } from '../controllers/noteController.js';

const router = express.Router();

// POST /api/customers/:id/notes
router.post('/:id/notes', addNote);

export default router;
