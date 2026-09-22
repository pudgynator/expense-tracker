import { Router } from 'express';
import registerRouter from './register.js';
import loginRouter from './login.js';
import expensesRouter from './expenses.js';

const router = Router();

router.use('/api/register', registerRouter);
router.use('/api/login', loginRouter);
router.use('/api/expenses', expensesRouter);

export default router;