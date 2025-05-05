import { Router } from "express";
import { CreateClassDTO } from "./classroom.dto";
import { classrooms, create } from "./classroom.controller";
import { validate } from "../../lib/validation-middleware";
import { isAuthenticated } from "../../lib/auth/auth.middlware";

const router = Router();

router.use(isAuthenticated);
router.post('/create', validate(CreateClassDTO), create);
router.get('', classrooms);
router.post('/:classroommld/assigments', );

export default router;