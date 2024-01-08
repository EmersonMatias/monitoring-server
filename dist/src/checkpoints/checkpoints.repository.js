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
import { database } from "../../prisma/index.js";
import { todaysDate } from "../functions.js";
//Criar todos os checkpoints dos usuários
export function createCheckPoints(checkpointData) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database.checkpoint.createMany({
                        data: checkpointData
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
//Criar apenas o checkpoint de um usuário
export function createCheckPoint(checkpointData) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database.checkpoint.create({
                        data: checkpointData
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
//Marcar o checkpoint
export function markCheckPoint(markCheckPointData) {
    return __awaiter(this, void 0, void 0, function () {
        var arrivalTime, arrived, checkpointId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    arrivalTime = markCheckPointData.arrivalTime, arrived = markCheckPointData.arrived, checkpointId = markCheckPointData.checkpointId;
                    return [4 /*yield*/, database.checkpoint.update({
                            where: {
                                id: checkpointId
                            },
                            data: {
                                arrivalTime: arrivalTime,
                                arrived: arrived
                            }
                        })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
//Pegar o checkpoint do usuário
export function getUserCheckpoints(userId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database.checkpoint.findMany({
                        where: {
                            userId: userId
                        }
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
//Pegar o checkpoint do usuário pelo dia atual
export function findCheckpointByIdByCurrentDate(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, day, year, monthc, currantDate;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = todaysDate(), day = _a.day, year = _a.year, monthc = _a.monthc;
                    currantDate = new Date("".concat(year, "-").concat(monthc, "-").concat(day));
                    return [4 /*yield*/, database.checkpoint.findFirst({
                            where: {
                                userId: userId,
                                date: currantDate
                            }
                        })];
                case 1: return [2 /*return*/, _b.sent()];
            }
        });
    });
}
export function findCheckpointdByCurrentDate() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, day, year, monthc, currantDate;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = todaysDate(), day = _a.day, year = _a.year, monthc = _a.monthc;
                    currantDate = new Date("".concat(year, "-").concat(monthc, "-").concat(day));
                    return [4 /*yield*/, database.checkpoint.findFirst({
                            where: {
                                date: currantDate
                            }
                        })];
                case 1: return [2 /*return*/, _b.sent()];
            }
        });
    });
}
// PEGAR TODOS OS CHECKPOINTS DO DIA
export function findCheckpointByDay() {
    return __awaiter(this, void 0, void 0, function () {
        var currantDate;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    currantDate = new Date();
                    return [4 /*yield*/, database.checkpoint.findMany({
                            where: {
                                date: currantDate
                            },
                            select: {
                                arrivalTime: true,
                                arrived: true,
                                date: true,
                                user: {
                                    select: {
                                        name: true,
                                        agency: true,
                                        entryTime: true
                                    }
                                }
                            }
                        })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
//Pegar todos os checkpoints
export function getAllCheckpoints() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database.checkpoint.findMany({
                        select: {
                            arrived: true,
                            arrivalTime: true,
                            date: true,
                            user: {
                                select: {
                                    name: true,
                                    agency: true,
                                    entryTime: true
                                }
                            }
                        }
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
//Excluir um checkpoint
export function deleteCheckpoints(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database.checkpoint.deleteMany({
                        where: {
                            userId: id
                        }
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
export function getCheckpointAgency(agency) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database.checkpoint.findMany({
                        where: {
                            user: {
                                agency: agency
                            }
                        },
                        include: {
                            user: {
                                select: {
                                    name: true,
                                    entryTime: true,
                                    departureTime: true
                                }
                            }
                        }
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
