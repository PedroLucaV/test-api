import { Router } from "express";
import { createUser, getUser, login, getEmail } from "../controller/user.js";

const router = Router();

router.post('/register', createUser);
router.post('/login', login);
router.get('/list', getUser);
router.get('/getEmail/:email', getEmail)

export default router;