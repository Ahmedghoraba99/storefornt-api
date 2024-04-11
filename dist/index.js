"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//importing necessary modules
var express_1 = __importDefault(require("express"));
var persons_1 = __importDefault(require("./handlers/persons"));
var orders_1 = __importDefault(require("./handlers/orders"));
var products_1 = __importDefault(require("./handlers/products"));
var app = (0, express_1.default)();
//MiddleWare
app.use(express_1.default.json());
//body parser
app.use(express_1.default.urlencoded({ extended: false }));
//using routes from handler
(0, persons_1.default)(app);
(0, orders_1.default)(app);
(0, products_1.default)(app);
var port = process.env.PORT;
//spinning the server
app.listen(port, function () {
    console.log("server running on port ".concat(port));
});
exports.default = app;
