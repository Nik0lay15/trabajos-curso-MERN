import { Router } from "express";
import InfoUtils from "../utilities/route-utils/info-util.js";

const ROUTER = Router();

ROUTER.get("/",InfoUtils);

export default ROUTER;