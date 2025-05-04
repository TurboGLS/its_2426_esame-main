import { Router } from "express";
import { validate } from "../../lib/validation-middleware";
import { isAuthenticated } from "../../lib/auth/auth.middlware";
import { listUsers } from "./user.controller";

const router = Router();

router.use(isAuthenticated);
router.get('', listUsers);

export default router;