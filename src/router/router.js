import { Router } from "express";
import userRoute from "./userRote.js";

const router = Router();

router.use('/user', userRoute);

export default router;