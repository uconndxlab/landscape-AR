import express from "express"
import { uploadFile } from "../controllers/files.controller";
import os from "os";

const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
router.post('/upload', upload.single('formFile'), uploadFile);

export default router;