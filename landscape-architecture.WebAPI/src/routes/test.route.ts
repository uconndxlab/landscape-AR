import express from "express"
import { addTest, getTest } from "../controllers/test.controller"

const router = express.Router();

router.get('/', getTest);
router.get('/add', addTest);

export default router;