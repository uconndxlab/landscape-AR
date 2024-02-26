import express from "express"
import { downloadFile, uploadFile, deleteFile } from "../controllers/files.controller";
import os from "os";

const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('formFile'), uploadFile);
router.get('/download/:id', downloadFile);
router.get('/delete', deleteFile);


export default router;