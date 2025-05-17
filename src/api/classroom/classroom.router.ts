import { Router } from "express";
import { CreateAssignmentsDTO, CreateClassDTO } from "./classroom.dto";
import { classrooms, create, createAssignments } from "./classroom.controller";
import { validate } from "../../lib/validation-middleware";
import { isAuthenticated } from "../../lib/auth/auth.middlware";

const router = Router();

router.use(isAuthenticated);
router.post('/create', validate(CreateClassDTO), create);
router.get('', classrooms);
router.post('/:classroomId/assigments', );

export default router;