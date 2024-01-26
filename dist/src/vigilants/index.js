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
import { VigilantsRepository as Vigilants, deleteMessages, vigilantCompleteWithFilter, vigilantWithStatus } from "./vigilants.repository.js";
import { deleteStatus, updateByUserId } from "../status/status.repository.js";
import { ContingencyRepository as Contingency } from "../contingency/contingency.repository.js";
import { CheckpointsRepository as Checkpoints } from "../checkpoints/checkpoints.repository.js";
var route = Router();
route.get("/vigilants", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var agencyId, agencyIda, sucess, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                agencyId = req.query.agencyId;
                agencyIda = agencyId ? Number(agencyId) : undefined;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Vigilants.findAll(agencyIda)];
            case 2:
                sucess = _a.sent();
                return [2 /*return*/, res.status(200).send(sucess)];
            case 3:
                error_1 = _a.sent();
                console.log(error_1);
                res.send(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
route.get("/vigilants/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, sucess, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                console.log("vigilants/id");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Vigilants.findOneById(Number(id))];
            case 2:
                sucess = _a.sent();
                res.send(sucess);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.log(error_2);
                res.send(error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
route.post("/vigilants/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, updateUserData, sucess, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                updateUserData = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, Vigilants.update(updateUserData)];
            case 2:
                sucess = _a.sent();
                return [4 /*yield*/, updateByUserId(id, updateUserData.frequency)];
            case 3:
                _a.sent();
                res.send(sucess);
                return [3 /*break*/, 5];
            case 4:
                error_3 = _a.sent();
                console.log(error_3);
                res.send(error_3);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
route.delete("/vigilants/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, userId, sucess, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                userId = Number(id);
                if (isNaN(userId))
                    return [2 /*return*/, (res.status(400).send("String is invalid!"))];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                return [4 /*yield*/, deleteMessages(userId)];
            case 2:
                _a.sent();
                return [4 /*yield*/, Checkpoints.deleteAll(userId)];
            case 3:
                _a.sent();
                return [4 /*yield*/, deleteStatus(userId)];
            case 4:
                _a.sent();
                return [4 /*yield*/, Contingency.deleteOne(userId)];
            case 5:
                _a.sent();
                return [4 /*yield*/, Vigilants.deleteOne(userId)];
            case 6:
                sucess = _a.sent();
                res.send(sucess);
                return [3 /*break*/, 8];
            case 7:
                error_4 = _a.sent();
                console.log(error_4);
                res.send(error_4);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
route.get("/vigilantwithstatus=:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, sucess, error_5;
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
                error_5 = _a.sent();
                console.log(error_5);
                res.send(error_5);
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
export default route;
