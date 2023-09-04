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
exports.AuthService = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const user_1 = require("../../../constants/user");
const config_1 = __importDefault(require("../../../config"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const registerUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isAlreadyExist = yield prisma_1.default.user.findUnique({
        where: {
            email: data.email,
        },
    });
    if (isAlreadyExist) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'User already exist');
    }
    const result = yield prisma_1.default.user.create({
        data,
        select: Object.assign({}, user_1.selectUserResponseFields),
    });
    return result;
});
const signIn = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: {
            email: data.email,
        },
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    if (data.password !== isUserExist.password) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
    }
    // const token = jwt.sign(
    // {
    //   role: isUserExist.role,
    //   userId: isUserExist.id,
    // },
    //   config.jwt.secret as Secret,
    //   { expiresIn: config.jwt.expires_in },
    // );
    const token = jwtHelpers_1.jwtHelpers.createToken({
        role: isUserExist.role,
        userId: isUserExist.id,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return token;
});
exports.AuthService = {
    registerUser,
    signIn,
};
