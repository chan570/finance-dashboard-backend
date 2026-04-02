import express from "express";
import {
  createRecord,
  getAllRecords,
  getRecordById,
  updateRecord,
  deleteRecord,
} from "../controllers/recordController.js";
import userAuth from "../middlewares/auth.js";
import allowRoles from "../middlewares/roleMiddleware.js";

const recordRouter = express.Router();

recordRouter.get("/", userAuth, allowRoles("viewer", "analyst", "admin"), getAllRecords);
recordRouter.get("/:id", userAuth, allowRoles("viewer", "analyst", "admin"), getRecordById);
recordRouter.post("/", userAuth, allowRoles("admin"), createRecord);
recordRouter.put("/:id", userAuth, allowRoles("admin"), updateRecord);
recordRouter.delete("/:id", userAuth, allowRoles("admin"), deleteRecord);

export default recordRouter;