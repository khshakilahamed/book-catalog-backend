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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.create({
        data,
    });
    return result;
});
const getAllFromDB = (verifiedUser) => __awaiter(void 0, void 0, void 0, function* () {
    if (verifiedUser.role === client_1.UserRole.admin) {
        const result = yield prisma_1.default.order.findMany();
        return result;
    }
    const result = yield prisma_1.default.order.findMany({
        where: {
            userId: verifiedUser.userId,
        },
    });
    return result;
});
const getByIdFromDB = (orderId, verifiedUser) => __awaiter(void 0, void 0, void 0, function* () {
    if (verifiedUser.role === client_1.UserRole.admin) {
        const result = yield prisma_1.default.order.findFirst({
            where: {
                id: orderId,
            },
        });
        return result;
    }
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: { id: verifiedUser.userId },
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'you are unauthorized');
    }
    const result = yield prisma_1.default.order.findUnique({
        where: {
            id: orderId,
            userId: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.id,
        },
    });
    return result;
});
exports.OrderService = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
};
