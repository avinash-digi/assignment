import Router from "express";
import { userController } from "../controllers/index.js";

const router = Router();

router.use("/user", userController);

export { router };
