import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import {
  createExpense,
  deleteExpense,
  listExpenses,
} from '../controllers/expenseController.js';

const router = Router();

router.use(requireAuth);
router.get('/api/expenses', listExpenses);
router.post('/api/expenses', createExpense);
router.delete('/api/expenses/:id', deleteExpense);

export default router;
