import express from "express"
import { objectToTopo } from "../controllers/model.controller";
const router = express.Router();

router.get('/objectToTopo/', objectToTopo);

export default router;