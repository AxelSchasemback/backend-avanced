import { Router } from "express";
import { getProductJSON } from "../controller/combo.controller.js";

export const comboRouter = Router()

comboRouter.get('/', getProductJSON)
