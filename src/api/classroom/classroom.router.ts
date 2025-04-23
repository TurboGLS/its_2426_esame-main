import { Router } from "express";
import { CreateClassDTO } from "./classroom.dto";
import { create } from "./classroom.controller";
import { validate } from "../../lib/validation-middleware";

const router = Router();

router.post('/create', validate(CreateClassDTO), create);

export default router;