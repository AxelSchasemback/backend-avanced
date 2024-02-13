import { Router } from "express";
import { getProductJSON } from "../controller/offer.controller.js";

export const offerRouter = Router()

offerRouter.get('/', getProductJSON)
