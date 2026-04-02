import express from "express";
import { getAllUsers, updateUserRoleStatus, getMyProfile } from "../controllers/userController.js";
import userAuth from "../middlewares/auth.js";
import allowRoles from "../middlewares/roleMiddleware.js";

const userRouter = express.Router();

userRouter.get("/me", userAuth, getMyProfile);
userRouter.get("/", userAuth, allowRoles("admin"), getAllUsers);
userRouter.put("/:id", userAuth, allowRoles("admin"), updateUserRoleStatus);

export default userRouter;