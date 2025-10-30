import express from "express";

const router = express.Router();

import {
  getAutomationSettings,
  addAutomationSettings,
  updateAutomationSettings,
} from "../controllers/automation-controller.js";

router.post("/automation/add-automation-settings", addAutomationSettings);
router.get(
  "/automation/get-automation-settings/:autoKey",
  getAutomationSettings
);
router.put("/automation/update-automation-settings/", updateAutomationSettings);

export default router;
