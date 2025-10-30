import express from "express";
import {
  upsertUser,
  getAllUsers,
  updateUserStatus,
  removeAllUsers,
} from "../controllers/user-controller.js";

const router = express.Router();

router.get("/user/", getAllUsers);
router.post("/user/", upsertUser);
router.post("/user/status", updateUserStatus);
router.get("/user/remove-all-users", removeAllUsers);

export default router;
