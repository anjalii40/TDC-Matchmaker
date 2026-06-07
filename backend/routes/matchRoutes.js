import express from 'express';
import { getMatches } from '../controllers/matchController.js';

const router = express.Router();

// GET /api/customers/:id/matches
router.get('/:id/matches', getMatches);

export default router;
