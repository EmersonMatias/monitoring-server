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
import { createCheckPoints, findCheckpointByDay, findCheckpointByIdByCurrentDate, findCheckpointdByCurrentDate, getAllCheckpoints, getCheckpointAgency, getUserCheckpoints, markCheckPoint } from "./checkpoints.repository.js";
import { findAllUsers } from "../signup/signup.repository.js";
import { todaysDate } from "../functions.js";
var route = Router();
//Criar todos os checkpoints dos vigilantes
route.post("/createcheckpoints", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, day, year, monthc, currantDate, checkpointsExist, allUsers, checkpointData, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = todaysDate(), day = _a.day, year = _a.year, monthc = _a.monthc;
                currantDate = new Date("".concat(year, "-").concat(monthc, "-").concat(day));
                return [4 /*yield*/, findCheckpointdByCurrentDate()];
            case 1:
                checkpointsExist = _b.sent();
                if (checkpointsExist)
                    return [2 /*return*/, res.sendStatus(400)];
                return [4 /*yield*/, findAllUsers()];
            case 2:
                allUsers = _b.sent();
                checkpointData = allUsers.map(function (user) {
                    return {
                        userId: user.id,
                        date: currantDate
                    };
                });
                _b.label = 3;
            case 3:
                _b.trys.push([3, 5, , 6]);
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
/*

//Criar apenas checkpoint do vigilante que foi criado apos todos os checkpoints terem sido criados
route.post("/createcheckpoint", async (req: Request, res: Response) => {
    const { userId } = req.body
    const { day, monthc, year } = todaysDate()
    const date = `${day}/${monthc}/${year}`
    console.log(day, monthc, year)

    const checkpointData = {
        userId,
        date
    }

    try {
        await createCheckPoint(checkpointData)
        res.status(200).send("Checkpoint Created")
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

*/
//Atualizar o checkpoint do dia
route.put("/checkpoint", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var checkpointId, currentDate, hour, minutes, markCheckPointData, sucess;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                checkpointId = req.body.checkpointId;
                currentDate = new Date;
                hour = currentDate.getHours().toString().padStart(2, "0");
                minutes = currentDate.getMinutes().toString().padStart(2, "0");
                markCheckPointData = {
                    checkpointId: checkpointId,
                    arrived: true,
                    arrivalTime: "".concat(hour, ":").concat(minutes)
                };
                return [4 /*yield*/, markCheckPoint(markCheckPointData)];
            case 1:
                sucess = _a.sent();
                res.sendStatus(200);
                return [2 /*return*/];
        }
    });
}); });
//Pegar os checkpoints do vigilante
route.get("/checkpoints/:userId", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, sucess;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.userId;
                return [4 /*yield*/, getUserCheckpoints(Number(userId))];
            case 1:
                sucess = _a.sent();
                console.log(sucess);
                res.send(sucess);
                return [2 /*return*/];
        }
    });
}); });
//Pegar todos os checkpoints
route.get("/checkpoints", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var sucess;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getAllCheckpoints()];
            case 1:
                sucess = _a.sent();
                console.log(sucess);
                res.send(sucess);
                return [2 /*return*/];
        }
    });
}); });
//Pegar os checkpoints por agência
route.get("/checkpointss/:agency", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var agency, sucess;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                agency = req.params.agency;
                return [4 /*yield*/, getCheckpointAgency(agency)];
            case 1:
                sucess = _a.sent();
                res.send(sucess);
                return [2 /*return*/];
        }
    });
}); });
//Pegar o checkpoint do usuario do dia atual
route.get("/checkpoints/currentday/:userId", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, sucess;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.userId;
                return [4 /*yield*/, findCheckpointByIdByCurrentDate(Number(userId))];
            case 1:
                sucess = _a.sent();
                res.send(sucess);
                return [2 /*return*/];
        }
    });
}); });
//PEGAR TODOS OS CHECKPOINTS DO DIA ATUAL
route.get("/checkpoints=today", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, findCheckpointByDay()];
            case 1:
                response = _a.sent();
                res.send(response);
                return [2 /*return*/];
        }
    });
}); });
export default route;
