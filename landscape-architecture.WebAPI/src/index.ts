import express from "express";
import test from "./routes/test.route";
const app = express();

app.use('/test', test)

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listening on PORT ${port}`));

