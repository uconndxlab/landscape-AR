import express from "express";
import test from "./routes/test.route";
import model from "./routes/model.route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.use('/test', test);
app.use('/model', model);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listening on PORT ${port}`));

export default prisma;

