import { takeCareAnimals } from "../controllers/animals-controler.js";
import express from "express";

const router = express.Router();

router.post("/animals", takeCareAnimals);

export default router;
