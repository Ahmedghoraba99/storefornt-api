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
exports.OrderFunctions = void 0;
//importing modules
var database_1 = __importDefault(require("../database"));
// user_id was written like this just to match the column name
// of the database out of convience
var OrderFunctions = /** @class */ (function () {
    function OrderFunctions() {
    }
    OrderFunctions.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sqlSELECT, result, order, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sqlSELECT = 'SELECT * FROM orders';
                        return [4 /*yield*/, connection.query(sqlSELECT)];
                    case 2:
                        result = _a.sent();
                        order = result.rows;
                        connection.release();
                        return [2 /*return*/, order];
                    case 3:
                        error_1 = _a.sent();
                        throw new Error('cant index orders err:  ' + error_1);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderFunctions.prototype.create = function (status, user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sqlSELECT, result, order, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sqlSELECT = 'INSERT INTO orders (status,user_id) values ($1,$2)';
                        return [4 /*yield*/, connection.query(sqlSELECT, [status, user_id])];
                    case 2:
                        result = _a.sent();
                        order = result.rows;
                        connection.release();
                        return [2 /*return*/, order];
                    case 3:
                        error_2 = _a.sent();
                        throw new Error('cant index orders err:  ' + error_2);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderFunctions.prototype.show = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sqlSELECT, result, order, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sqlSELECT = 'SELECT * FROM orders WHERE user_id=($1)';
                        return [4 /*yield*/, connection.query(sqlSELECT, [user_id])];
                    case 2:
                        result = _a.sent();
                        order = result.rows[0];
                        connection.release();
                        return [2 /*return*/, order];
                    case 3:
                        error_3 = _a.sent();
                        throw new Error('cant show specific order err:  ' + error_3);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderFunctions.prototype.addProductOrder = function (quantity, order_id, product_id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, connection, result, order, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'INSERT INTO odersProducts (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.query(sql, [
                                quantity,
                                order_id,
                                product_id,
                            ])];
                    case 2:
                        result = _a.sent();
                        order = result.rows[0];
                        connection.release();
                        return [2 /*return*/, order];
                    case 3:
                        error_4 = _a.sent();
                        throw new Error('cant add order err:  ' + error_4);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return OrderFunctions;
}());
exports.OrderFunctions = OrderFunctions;
