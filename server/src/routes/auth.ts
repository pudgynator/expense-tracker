import { Router } from 'express';
import registerRouter from './register.js';
import loginRouter from './login.js';

const router = Router();

router.use('/api/register', registerRouter);
router.use('/api/login', loginRouter);

export default router;