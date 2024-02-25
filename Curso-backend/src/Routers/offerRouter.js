import { Router } from "express";
import { getProductJSON } from "../controller/offer.controller.js";
import { gzipMiddleware } from "../middlewares/middle-gzip.js";

export const offerRouter = Router()

offerRouter.get('/', getProductJSON, gzipMiddleware)
