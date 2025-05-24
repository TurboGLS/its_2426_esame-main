import { Router } from "express";
import { validate } from "../../lib/validation-middleware";
import { isAuthenticated } from "../../lib/auth/auth.middlware";
import { listUsers, me } from "./user.controller";

const router = Router();

router.use(isAuthenticated);
router.get('', listUsers);
router.get('/me', me);

export default router;