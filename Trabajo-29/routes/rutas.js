import { Router } from "express";
import InfoUtils from "../utilities/route-utils/info-util.js";
import RandomsUtils from "../utilities/route-utils/random-util.js";

const ROUTER = Router();

ROUTER.get("/info",InfoUtils);
ROUTER.get("/randoms",RandomsUtils);

export default ROUTER;