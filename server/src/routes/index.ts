import express from 'express';
const router = express.Router();

import authRouter from './auth.js';
import expensesRouter from './expenses.js';

router.use('/', authRouter);
router.use('/', expensesRouter);

export default router;