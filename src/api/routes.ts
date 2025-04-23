import { Router } from "express";
import ClassRouter from './classroom/classroom.router';

const router = Router();

router.use('/classrooms', ClassRouter)

export default router;