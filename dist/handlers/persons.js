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
var persons_1 = require("../models/persons");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var authentication_1 = __importDefault(require("../middleware/authentication"));
//auth. function
var PersonFunction = new persons_1.PersonsFunctions();
var tokenSecret = process.env.TOKEN_SECRET;
//index method
var index = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Persons, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, PersonFunction.index()];
            case 1:
                Persons = _a.sent();
                res.json(Persons);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(401).send('index err');
                throw new Error("Can't display users " + error_1);
            case 3: return [2 /*return*/];
        }
    });
}); };
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = Number(req.params.id);
                return [4 /*yield*/, PersonFunction.show(id)];
            case 1:
                user = _a.sent();
                res.send(user);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(401).json(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var fname, lname, password, person, personToken, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                fname = req.body.fname;
                lname = req.body.lname;
                password = req.body.password;
                return [4 /*yield*/, PersonFunction.create(fname, lname, password)];
            case 1:
                person = _a.sent();
                personToken = jsonwebtoken_1.default.sign({ person: person }, tokenSecret);
                res.send(personToken);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(401).send('create err');
                throw new Error(err_1 + " cant create person");
            case 3: return [2 /*return*/];
        }
    });
}); };
var destroy = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, person, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.body.id;
                return [4 /*yield*/, PersonFunction.destroy(id)];
            case 1:
                person = _a.sent();
                res.send("deleted" + person);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res.status(401).send('delete err');
                res.status(401).send('create err');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var fname, lname, id, password, updatedPerson, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                fname = req.body.fname;
                lname = req.body.lname;
                id = req.body.id;
                password = req.body.password;
                return [4 /*yield*/, PersonFunction.update(id, fname, lname, password)];
            case 1:
                updatedPerson = _a.sent();
                res.send(updatedPerson);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                res.status(401).send('update err');
                throw new Error("Can't update person err  " + error_4);
            case 3: return [2 /*return*/];
        }
    });
}); };
var personRoutes = function (app) {
    app.get('/users', authentication_1.default, index);
    app.get('/users/:id', authentication_1.default, show);
    app.post('/users', create);
    app.put('/users', authentication_1.default, update);
    app.delete('/users', authentication_1.default, destroy);
};
exports.default = personRoutes;
