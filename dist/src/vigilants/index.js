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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
import { Router } from "express";
import { findAllUsers } from "../signup/signup.repository.js";
import { deleteMessages, deleteVigilant, getAgencies, updateVigilant, vigilantComplete, vigilantCompleteWithFilter, vigilantWithStatus } from "./vigilants.repository.js";
import { deleteStatus, updateByUserId } from "../status/status.repository.js";
import { ContingencyRepository as Contingency } from "../contingency/contingency.repository.js";
import { CheckpointsRepository as Checkpoints } from "../checkpoints/checkpoints.repository.js";
var route = Router();
route.get("/vigilants", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var sucess;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, findAllUsers()];
            case 1:
                sucess = _a.sent();
                return [2 /*return*/, res.status(200).send(sucess)];
        }
    });
}); });
route.delete("/vigilants/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, userId, sucessM, sucessC, sucessS, sucessCon, sucess;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                userId = Number(id);
                if (isNaN(userId))
                    return [2 /*return*/, (res.status(400).send("String is invalid!"))];
                return [4 /*yield*/, deleteMessages(userId)];
            case 1:
                sucessM = _a.sent();
                return [4 /*yield*/, Checkpoints.deleteAll(userId)];
            case 2:
                sucessC = _a.sent();
                return [4 /*yield*/, deleteStatus(userId)];
            case 3:
                sucessS = _a.sent();
                return [4 /*yield*/, Contingency.deleteOne(userId)];
            case 4:
                sucessCon = _a.sent();
                return [4 /*yield*/, deleteVigilant(userId)];
            case 5:
                sucess = _a.sent();
                console.log(sucess);
                res.send(sucess);
                return [2 /*return*/];
        }
    });
}); });
route.get("/vigilants/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, userId, sucess;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                userId = Number(id);
                if (isNaN(userId))
                    return [2 /*return*/, (res.status(400).send("String is invalid!"))];
                return [4 /*yield*/, vigilantComplete(userId)];
            case 1:
                sucess = _a.sent();
                res.send(sucess);
                return [2 /*return*/];
        }
    });
}); });
route.get("/vigilantwithstatus=:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, sucess, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, vigilantWithStatus(Number(id))];
            case 2:
                sucess = _a.sent();
                res.send(sucess);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.log(error_1);
                res.send(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
route.post("/vigilantsfilter=:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, filter, userId, sucess;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                filter = req.body.filter;
                userId = Number(id);
                console.log(id);
                console.log(filter);
                if (isNaN(userId))
                    return [2 /*return*/, (res.status(400).send("String is invalid!"))];
                return [4 /*yield*/, vigilantCompleteWithFilter(userId, filter)];
            case 1:
                sucess = _a.sent();
                res.send(sucess);
                return [2 /*return*/];
        }
    });
}); });
route.post("/updatevigilant/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, agency, cpf, dateofbirth, departureTime, entryTime, login, name, rg, frequency, saturday, sunday, sucess, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, agency = _a.agency, cpf = _a.cpf, dateofbirth = _a.dateofbirth, departureTime = _a.departureTime, entryTime = _a.entryTime, login = _a.login, name = _a.name, rg = _a.rg, frequency = _a.frequency, saturday = _a.saturday, sunday = _a.sunday;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, updateVigilant({ id: id, agency: agency, cpf: cpf, dateofbirth: dateofbirth, departureTime: departureTime, entryTime: entryTime, login: login, name: name, rg: rg, saturday: saturday, sunday: sunday })];
            case 2:
                sucess = _b.sent();
                return [4 /*yield*/, updateByUserId(id, frequency)];
            case 3:
                _b.sent();
                res.send(sucess);
                return [3 /*break*/, 5];
            case 4:
                error_2 = _b.sent();
                console.log(error_2);
                res.send(error_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
route.get("/agency/:agency", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var agency, sucess;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                agency = req.params.agency;
                return [4 /*yield*/, getAgencies(agency)];
            case 1:
                sucess = _a.sent();
                res.send(sucess);
                return [2 /*return*/];
        }
    });
}); });
export default route;
