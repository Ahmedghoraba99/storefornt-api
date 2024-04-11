"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var index_1 = __importDefault(require("../index"));
var orders_1 = require("../models/orders");
var orderFunction = new orders_1.OrderFunctions();
var user = {
    id: 1,
    fname: 'test',
    lname: 'user',
    password: 'hello',
};
var token = jsonwebtoken_1.default.sign(user, process.env.TOKEN_SECRET);
var order = {
    status: 'string',
};
it('Index works without type err', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        expect(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                orderFunction.index();
                return [2 /*return*/];
            });
        }); }).not.toThrow(TypeError);
        return [2 /*return*/];
    });
}); });
it('Show works without type err', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        expect(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                orderFunction.show(1);
                return [2 /*return*/];
            });
        }); }).not.toThrow(TypeError);
        return [2 /*return*/];
    });
}); });
it('Show works without type err', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        expect(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                orderFunction.create('active', 1);
                return [2 /*return*/];
            });
        }); }).not.toThrow(TypeError);
        return [2 /*return*/];
    });
}); });
var req = (0, supertest_1.default)(index_1.default);
describe('Orders functions definition testing.....', function () {
    it('index method defined', function () {
        expect(orderFunction.index).toBeDefined();
    });
    it('show method defined', function () {
        expect(orderFunction.show).toBeDefined();
    });
    it('addProductOrder method defined', function () {
        expect(orderFunction.addProductOrder).toBeDefined();
    });
    it('Create method defined', function () {
        expect(orderFunction.create).toBeDefined();
    });
});
describe('dening acess without token testing.....', function () {
    it(' fails to GET /orders without bearer token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.get('/orders')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
    it(' fails to GET /orders/id without bearer token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.get('/orders/1')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
    it(' fails to POST /orders/:id/products without bearer token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req
                        .post('/orders/1/products')
                        .send({ quant: 1, order_id: 1, product_id: 1 })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('acess granted with token testing.....', function () {
    it(' sucess to GET /orders with bearer token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req
                        .get('/orders')
                        .set('Authorization', "Bearer ".concat(token))];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it(' sucess to GET /orders/id with bearer token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req
                        .get('/orders/1')
                        .set('Authorization', "Bearer ".concat(token))];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
});
//productsOrders
describe('acess granted with token testing.....', function () {
    it(' sucess to post /orders with bearer token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req
                        .post('/orders')
                        .send(order)
                        .set('Authorization', "Bearer ".concat(token))];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it(' sucess to post /orders/id/products with bearer token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req
                        .post('/orders/1/products')
                        .send({ quant: 1, order_id: 1, product_id: 1 })
                        .set('Authorization', "Bearer ".concat(token))];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
});
//Model testing
describe('Products functions not throwing errs', function () {
    it('Index order works without type err', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    orderFunction.index();
                    return [2 /*return*/];
                });
            }); }).not.toThrow(TypeError);
            return [2 /*return*/];
        });
    }); });
    it('Show order works without type err', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    orderFunction.show(1);
                    return [2 /*return*/];
                });
            }); }).not.toThrow(TypeError);
            return [2 /*return*/];
        });
    }); });
    it('Create order works without type err', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    orderFunction.create('test', 1);
                    return [2 /*return*/];
                });
            }); }).not.toThrow(TypeError);
            return [2 /*return*/];
        });
    }); });
});
