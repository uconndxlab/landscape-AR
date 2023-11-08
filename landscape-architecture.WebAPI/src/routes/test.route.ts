import express from "express"
import { getTest } from "../controllers/test.controller"

const router = express.Router();

router.get('/', getTest);

export default router;