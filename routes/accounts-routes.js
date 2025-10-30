import {
  addAccountsList,
  getAccount,
  getAllAccounts,
  resetAccount,
} from "../controllers/account-controller.js";

import express from "express";

const router = express.Router();

router.post("/accounts/add", addAccountsList);
router.get("/accounts/get", getAccount);
router.get("/accounts/get-all", getAllAccounts);
router.get("/accounts/reset", resetAccount);

export default router;
