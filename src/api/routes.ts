import { Router } from "express";
import classRouter from './classroom/classroom.router';
import userRouter from './user/user.router';
import authRouter from './auth/auth.router';

const router = Router();

router.use('/classrooms', classRouter);
router.use('/users', userRouter);
router.use(authRouter);

export default router;