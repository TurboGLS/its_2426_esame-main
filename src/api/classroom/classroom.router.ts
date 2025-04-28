import { Router } from "express";
import { CreateClassDTO } from "./classroom.dto";
import { create } from "./classroom.controller";
import { validate } from "../../lib/validation-middleware";
import { isAuthenticated } from "../../lib/auth/auth.middlware";

const router = Router();

router.use(isAuthenticated);
router.post('/create', validate(CreateClassDTO), create);

export default router;