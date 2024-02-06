"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const model_route_1 = __importDefault(require("./routes/model.route"));
const files_route_1 = __importDefault(require("./routes/files.route"));
const client_1 = require("@prisma/client");
const errors_1 = require("./middleware/errors");
const BASE_ROUTE = '/api/v0';
exports.prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const cors = require('cors');
app.use(cors({
    origin: '*'
}));
app.use(BASE_ROUTE + '/model', model_route_1.default);
app.use(BASE_ROUTE + '/files', files_route_1.default);
app.use(errors_1.errorHandler);
const port = process.env.PORT || 8000;
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => console.log(`App listening on PORT ${port}`));
}
