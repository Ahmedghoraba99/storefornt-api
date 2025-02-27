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
exports.PersonsFunctions = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var database_1 = __importDefault(require("../database"));
var pepper = process.env.BCRYPT_PASSWORD;
var salt = process.env.SALT_ROUNDS;
// export and creatng CRUD class PersonFunctions
var PersonsFunctions = /** @class */ (function () {
    function PersonsFunctions() {
    }
    PersonsFunctions.prototype.create = function (fname, lname, password) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, hash, sqlSELECT, result, perosn, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        hash = bcrypt_1.default.hashSync(password + pepper, parseInt(salt));
                        sqlSELECT = "INSERT INTO users (firstname,lastname,password_digest) values ($1,$2,$3)  RETURNING *";
                        return [4 /*yield*/, conn.query(sqlSELECT, [fname, lname, hash])];
                    case 2:
                        result = _a.sent();
                        perosn = result.rows[0];
                        conn.release();
                        return [2 /*return*/, perosn];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("Could not add new perosn . Error: ".concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PersonsFunctions.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connect, sqlSELECT, results, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connect = _a.sent();
                        sqlSELECT = 'SELECT * from users';
                        return [4 /*yield*/, connect.query(sqlSELECT)];
                    case 2:
                        results = _a.sent();
                        connect.release();
                        return [2 /*return*/, results.rows];
                    case 3:
                        error_1 = _a.sent();
                        throw new Error('connct err (index)' + error_1);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PersonsFunctions.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var connect, sqlSELECT, results, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connect = _a.sent();
                        sqlSELECT = 'SELECT * from users WHERE id=($1)';
                        return [4 /*yield*/, connect.query(sqlSELECT, [id])];
                    case 2:
                        results = _a.sent();
                        connect.release();
                        return [2 /*return*/, results.rows[0]];
                    case 3:
                        error_2 = _a.sent();
                        throw new Error('can"T load specific person err' + error_2);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PersonsFunctions.prototype.destroy = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var connect, sqlSELECT, results, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connect = _a.sent();
                        sqlSELECT = 'DELETE FROM users WHERE id=($1)';
                        return [4 /*yield*/, connect.query(sqlSELECT, [id])];
                    case 2:
                        results = _a.sent();
                        connect.release();
                        return [2 /*return*/, results.rows[0]];
                    case 3:
                        error_3 = _a.sent();
                        throw new Error('Err deleting person' + error_3);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PersonsFunctions.prototype.update = function (id, fname, lname, password) {
        return __awaiter(this, void 0, void 0, function () {
            var connect, sqlSELECT, hash, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connect = _a.sent();
                        sqlSELECT = 'UPDATE users SET firstname=($2),lastname=($3), password_digest=($4)  WHERE id=($1) RETURNING *';
                        hash = bcrypt_1.default.hashSync(password + pepper, parseInt(salt));
                        return [4 /*yield*/, connect.query(sqlSELECT, [id, fname, lname, hash])];
                    case 2:
                        result = _a.sent();
                        connect.release();
                        return [2 /*return*/, result.rows[0]];
                }
            });
        });
    };
    return PersonsFunctions;
}());
exports.PersonsFunctions = PersonsFunctions;
exports.default = PersonsFunctions;
