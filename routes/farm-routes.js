import express from "express";
import {
  addOrUpdateFarm,
  getFarm,
  getAllFarms,
  deleteAllFarms,
} from "../controllers/farm-controller.js";

const router = express.Router();

// Nếu user chưa có thì tạo, nếu có rồi thì update seedAt
router.post("/farm", addOrUpdateFarm);
router.get("/farm/get-all", getAllFarms);
router.get("/farm/reset-all", deleteAllFarms);
router.get("/farm/:userId", getFarm);

export default router;
