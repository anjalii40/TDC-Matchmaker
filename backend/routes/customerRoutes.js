import express from 'express';
import { getCustomers, getCustomerById, updateCustomer } from '../controllers/customerController.js';

const router = express.Router();

// GET /api/customers
router.get('/', getCustomers);

// GET /api/customers/:id
router.get('/:id', getCustomerById);

// PUT /api/customers/:id
router.put('/:id', updateCustomer);
router.patch('/:id', updateCustomer);

export default router;
