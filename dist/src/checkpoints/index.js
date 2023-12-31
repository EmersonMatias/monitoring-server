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
import { createCheckPoints, findCheckpointByDay, findCheckpointByIdByCurrentDate, getAllCheckpoints, getCheckpointAgency, getCheckpointAgencyWithFilter, getCheckpointByIDByDate, getUserCheckpoints, markCheckPoint } from "./checkpoints.repository.js";
import { findAllUsers } from "../signup/signup.repository.js";
import { dateTime } from "../functions.js";
var route = Router();
//CRIA TODOS OS CHECKPOINTS DOS USUÁRIOS *****
route.post("/checkpoints/createall", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, day, month, year, checkpointsExist, allUsers, checkpointData, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = dateTime(), day = _a.day, month = _a.month, year = _a.year;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, findCheckpointByDay()];
            case 2:
                checkpointsExist = _b.sent();
                if (checkpointsExist.length !== 0)
                    return [2 /*return*/, res.sendStatus(400)];
                return [4 /*yield*/, findAllUsers()];
            case 3:
                allUsers = _b.sent();
                checkpointData = allUsers.map(function (user) {
                    return {
                        userId: user.id,
                        day: Number(day),
                        month: Number(month),
                        year: Number(year)
                    };
                });
                return [4 /*yield*/, createCheckPoints(checkpointData)];
            case 4:
                _b.sent();
                res.status(200).send("Checkpoints Created");
                return [3 /*break*/, 6];
            case 5:
                error_1 = _b.sent();
                console.log(error_1);
                res.send(error_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
//ATUALIZAR O CHECKPOINT *****
route.put("/checkpoint", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var checkpointId, _a, hour, minute, markCheckPointData, sucess, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                checkpointId = req.body.checkpointId;
                _a = dateTime(), hour = _a.hour, minute = _a.minute;
                markCheckPointData = {
                    checkpointId: checkpointId,
                    arrived: true,
                    arrivalTime: "".concat(hour, ":").concat(minute)
                };
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, markCheckPoint(markCheckPointData)];
            case 2:
                sucess = _b.sent();
                res.status(200).send({ sucess: sucess, message: "Checkpoint atualizado." });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                console.log(error_2);
                res.send(error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
//PEGAR TODOS OS CHECKPOINTS DO USUÁRIO *****
route.get("/checkpoints/:userId", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, sucess, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.userId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, getUserCheckpoints(Number(userId))];
            case 2:
                sucess = _a.sent();
                console.log(sucess);
                res.send(sucess);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                console.log(error_3);
                res.send(error_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
//PEGAR TODOS OS CHECKPOINTS *****
route.get("/checkpoints", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var sucess, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, getAllCheckpoints()];
            case 1:
                sucess = _a.sent();
                console.log(sucess);
                res.send(sucess);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.log(error_4);
                res.send(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//PEGAR TODOS OS CHECKPOINTS POR AGÊNCIA *****
route.get("/checkpointss/:agency", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var agency, sucess, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                agency = req.params.agency;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, getCheckpointAgency(agency)];
            case 2:
                sucess = _a.sent();
                res.send(sucess);
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                console.log(error_5);
                res.send(error_5);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
//PEGAR CHECKPOINTS COM FILTRO DE DATA *****
route.post("/checkpointsfilter=:agency", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var agency, filter, sucess, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                agency = req.params.agency;
                filter = req.body.filter;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, getCheckpointAgencyWithFilter(agency, filter)];
            case 2:
                sucess = _a.sent();
                res.send(sucess);
                return [3 /*break*/, 4];
            case 3:
                error_6 = _a.sent();
                console.log(error_6);
                res.send(error_6);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
//PEGAR O CHECKPOINT DO VIGILANTE DO DIA ATUAL *****
route.get("/checkpoints/currentday/:userId", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, sucess, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.userId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, findCheckpointByIdByCurrentDate(Number(userId))];
            case 2:
                sucess = _a.sent();
                res.send(sucess);
                return [3 /*break*/, 4];
            case 3:
                error_7 = _a.sent();
                console.log(error_7);
                res.send(error_7);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
//PEGAR TODOS OS CHECKPOINTS DO DIA ATUAL *****
route.get("/checkpoints=today", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, findCheckpointByDay()];
            case 1:
                response = _a.sent();
                res.send(response);
                return [3 /*break*/, 3];
            case 2:
                error_8 = _a.sent();
                console.log(error_8);
                res.send(error_8);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
route.get("/filtercheckpoints", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var filter, sucess, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                filter = req.body.filter;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, getCheckpointByIDByDate(filter)];
            case 2:
                sucess = _a.sent();
                res.send(sucess);
                return [3 /*break*/, 4];
            case 3:
                error_9 = _a.sent();
                console.log(error_9);
                res.send(error_9);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
export default route;
