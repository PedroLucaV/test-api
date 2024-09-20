import { Router } from "express";
import { createUser, getUser, login } from "../controller/user.js";

const router = Router();

router.post('/register', createUser);
router.post('/login', login);
router.get('/list', getUser);

export default router;