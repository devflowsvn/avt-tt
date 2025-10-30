import {
  addAccountsList,
  getAccount,
  getAllAccounts,
  resetAccount,
  deleteAllAccounts,
} from "../controllers/account-controller.js";

import express from "express";

const router = express.Router();

router.post("/accounts/add", addAccountsList);
router.get("/accounts/get", getAccount);
router.get("/accounts/get-all", getAllAccounts);
router.get("/accounts/reset", resetAccount);
router.get("/accounts/delete-all", deleteAllAccounts);

export default router;
