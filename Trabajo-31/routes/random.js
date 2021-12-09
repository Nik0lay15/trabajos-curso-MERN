import { Router } from "express";
import RandomsUtils from "../utilities/route-utils/random-util.js";

const ROUTER = Router();

ROUTER.get("/",RandomsUtils);

export default ROUTER;