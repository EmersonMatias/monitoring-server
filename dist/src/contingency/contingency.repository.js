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
import { dateTime } from "../functions.js";
function create(createContingencyData) {
    return __awaiter(this, void 0, void 0, function () {
        var contigency, frequency, hour, minute, status, userId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    contigency = createContingencyData.contigency, frequency = createContingencyData.frequency, hour = createContingencyData.hour, minute = createContingencyData.minute, status = createContingencyData.status, userId = createContingencyData.userId;
                    return [4 /*yield*/, database.contingency.create({
                            data: {
                                userId: userId,
                                hour: hour,
                                minute: minute,
                                frequency: frequency,
                                status: status,
                                contigency: contigency
                            }
                        })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function activate(activateContingencyData) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, frequency, contigency, _a, hour, minute;
        return __generator(this, function (_b) {
            userId = activateContingencyData.userId, frequency = activateContingencyData.frequency;
            contigency = true;
            _a = dateTime(), hour = _a.hour, minute = _a.minute;
            return [2 /*return*/, database.contingency.update({
                    where: {
                        userId: userId
                    },
                    data: {
                        frequency: frequency,
                        contigency: contigency,
                        hour: Number(hour),
                        minute: Number(minute),
                        status: "OK"
                    }
                })];
        });
    });
}
function deactivate(deactivateContingencyData) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, contigency;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = deactivateContingencyData.userId;
                    contigency = false;
                    return [4 /*yield*/, database.contingency.update({
                            where: {
                                userId: userId
                            },
                            data: {
                                contigency: contigency
                            }
                        })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function checkpoint(checkpointContingencyData) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, status, _a, hour, minute;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    userId = checkpointContingencyData.userId, status = checkpointContingencyData.status;
                    _a = dateTime(), hour = _a.hour, minute = _a.minute;
                    return [4 /*yield*/, database.contingency.update({
                            where: {
                                userId: userId
                            },
                            data: {
                                status: status,
                                hour: Number(hour),
                                minute: Number(minute)
                            }
                        })];
                case 1: return [2 /*return*/, _b.sent()];
            }
        });
    });
}
function getAll() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database.contingency.findMany({
                        include: {
                            user: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function getByUserID(userId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database.contingency.findUnique({
                        where: {
                            userId: userId
                        },
                        include: {
                            user: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function deleteOne(userId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, database.contingency.delete({
                    where: {
                        userId: userId
                    }
                })];
        });
    });
}
export var ContingencyRepository = {
    create: create,
    activate: activate,
    deactivate: deactivate,
    checkpoint: checkpoint,
    getAll: getAll,
    getByUserID: getByUserID,
    deleteOne: deleteOne
};
