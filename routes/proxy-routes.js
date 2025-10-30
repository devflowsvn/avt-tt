import express from "express";

import {
  addProxies,
  getProxy,
  resetProxies,
  deleteAllProxies,
  getAllProxies,
} from "../controllers/proxy-controller.js";
const router = express.Router();

router.post("/proxies/add", addProxies);
router.get("/proxies/get", getProxy);
router.get("/proxies/reset", resetProxies);
router.get("/proxies/remove", deleteAllProxies);
router.get("/proxies/all", getAllProxies);
export default router;
