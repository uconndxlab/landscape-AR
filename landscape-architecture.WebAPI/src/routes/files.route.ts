import express from "express"
import { uploadFile } from "../controllers/files.controller";
import { upload } from "..";

const router = express.Router();


router.post('/upload',upload.single("file"), uploadFile);

export default router;