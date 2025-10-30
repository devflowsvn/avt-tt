import express from "express";
import {
  upsertFishChecker,
  getFishChecker,
} from "../controllers/fish-controller.js";
const router = express.Router();

// router.get("/fish/:username", getFishChecker);
router.post("/fish", upsertFishChecker);
router.get("/fish", getFishChecker);

export default router;
