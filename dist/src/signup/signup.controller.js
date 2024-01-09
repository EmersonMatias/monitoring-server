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
import { signupServices } from "./signup.services.js";
import { createCheckPoint } from "../checkpoints/checkpoints.repository.js";
import { createStatus } from "../status/status.repository.js";
import { dateTime } from "../functions.js";
export function registerVigilant(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var signupData, _a, day, month, year, hour, minute, sucess, checkpointData, statusData, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    signupData = req.body;
                    _a = dateTime(), day = _a.day, month = _a.month, year = _a.year, hour = _a.hour, minute = _a.minute;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, signupServices.registerVigilant(signupData)];
                case 2:
                    sucess = _b.sent();
                    checkpointData = {
                        userId: sucess.id,
                        day: Number(day),
                        month: Number(month),
                        year: Number(year)
                    };
                    //CRIA CHECKPOINT DO VIGILANTE
                    return [4 /*yield*/, createCheckPoint(checkpointData)];
                case 3:
                    //CRIA CHECKPOINT DO VIGILANTE
                    _b.sent();
                    statusData = {
                        userId: sucess.id,
                        hour: Number(hour),
                        minute: Number(hour),
                    };
                    //CRIA STATUS DO VIGILANTE
                    return [4 /*yield*/, createStatus(statusData)];
                case 4:
                    //CRIA STATUS DO VIGILANTE
                    _b.sent();
                    return [2 /*return*/, res.status(201).send({ userId: sucess.id })];
                case 5:
                    error_1 = _b.sent();
                    console.log(error_1);
                    res.status(400).send(error_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
