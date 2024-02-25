import { Router } from "express";
import { getProductJSON } from "../controller/combo.controller.js";
import { gzipMiddleware } from "../middlewares/middle-gzip.js";

export const comboRouter = Router()

comboRouter.get('/', getProductJSON, gzipMiddleware)
