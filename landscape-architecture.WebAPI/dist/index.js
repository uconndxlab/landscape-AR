"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const test_route_1 = __importDefault(require("./routes/test.route"));
const model_route_1 = __importDefault(require("./routes/model.route"));
const app = (0, express_1.default)();
app.use('/test', test_route_1.default);
app.use('/model', model_route_1.default);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on PORT ${port}`));
