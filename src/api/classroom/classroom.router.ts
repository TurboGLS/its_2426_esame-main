import { Router } from "express";
import { ASsignmentsDTO, CreateClassDTO } from "./classroom.dto";
import { classrooms, completedAssignments, create, createAssignments, getAssignments } from "./classroom.controller";
import { validate } from "../../lib/validation-middleware";
import { isAuthenticated } from "../../lib/auth/auth.middlware";

const router = Router();

router.use(isAuthenticated);
router.post('/create', validate(CreateClassDTO), create);
router.get('', classrooms);
router.post('/:classroomId/assigments', validate(ASsignmentsDTO) , createAssignments);
router.get('/:classroomId/assigments', getAssignments);
router.patch('/:classroomId/assignments/:assignmentsId', completedAssignments);

export default router;