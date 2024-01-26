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
//CRIAR UMA MENSAGEM NOVA *****
export function createMessage(_a) {
    var message = _a.message, userId = _a.userId;
    return __awaiter(this, void 0, void 0, function () {
        var _b, day, month, year, hour, minute;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = dateTime(), day = _b.day, month = _b.month, year = _b.year, hour = _b.hour, minute = _b.minute;
                    return [4 /*yield*/, database.messages.create({
                            data: {
                                userId: userId,
                                message: message,
                                day: Number(day),
                                month: Number(month),
                                year: Number(year),
                                hour: "".concat(hour, ":").concat(minute)
                            }
                        })];
                case 1: return [2 /*return*/, _c.sent()];
            }
        });
    });
}
//ATUALIZAR MENSAGEM COMO VISTA *****
export function viewedMessage(_a) {
    var response = _a.response, messageId = _a.messageId;
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, database.messages.update({
                        where: {
                            id: messageId
                        }, data: {
                            viewed: true,
                            response: response
                        }
                    })];
                case 1: return [2 /*return*/, _b.sent()];
            }
        });
    });
}
//PEGAR TODAS AS MENSAGENS *****
export function findAllMensagens() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database.messages.findMany({
                        select: {
                            id: true,
                            day: true,
                            month: true,
                            year: true,
                            hour: true,
                            message: true,
                            response: true,
                            viewed: true,
                            user: {
                                select: {
                                    name: true,
                                    agency: true
                                }
                            }
                        }
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
//PEGAR MENSAGENS POR AGÊNCIA ******
export function getMessagesAgency(agencyId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database.messages.findMany({
                        where: {
                            user: {
                                agencyId: agencyId
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
//PEGAR MENSAGENS POR AGÊNCIA E POR FILTRO DE DATA******
export function getMessagesAgencyWithFilter(agencyId, filter) {
    return __awaiter(this, void 0, void 0, function () {
        var day, month, year;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    day = filter.day, month = filter.month, year = filter.year;
                    return [4 /*yield*/, database.messages.findMany({
                            where: {
                                user: {
                                    agencyId: agencyId
                                },
                                day: {
                                    gte: Number(day.first),
                                    lte: Number(day.end)
                                },
                                month: {
                                    gte: Number(month.first),
                                    lte: Number(month.end)
                                },
                                year: {
                                    gte: Number(year.first),
                                    lte: Number(year.end)
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
