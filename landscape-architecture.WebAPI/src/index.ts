import express from "express";
import test from "./routes/test.route";
import model from "./routes/model.route";
import files from "./routes/files.route";
import { PrismaClient } from "@prisma/client";

const BASE_ROUTE = '/api/v0';
export const prisma = new PrismaClient();
const app = express();
const cors = require('cors');

app.use(cors({
    origin: '*'
}));

app.use(BASE_ROUTE + '/test', test);
app.use(BASE_ROUTE + '/model', model);
app.use(BASE_ROUTE + '/files', files);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`App listening on PORT ${port}`));

