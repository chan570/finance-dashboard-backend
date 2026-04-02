import express from "express";
import { getDashboardSummary } from "../controllers/summaryController.js";
import userAuth from "../middlewares/auth.js";
import allowRoles from "../middlewares/roleMiddleware.js";

const summaryRouter = express.Router();

summaryRouter.get("/", userAuth, allowRoles("analyst", "admin"), getDashboardSummary);

export default summaryRouter;