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
exports.validarjwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Usuario_1 = __importDefault(require("../models/Usuario"));
const validarjwt = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header("x-token");
    const privateKey = process.env.SECRETORPRIVATEKEY;
    if (!token) {
        return res.status(401).json({
            msg: "No existe Token en la peticion",
        });
    }
    try {
        const { id } = jsonwebtoken_1.default.verify(token, privateKey);
        const user = yield Usuario_1.default.findByPk(id);
        if (!user) {
            return res.status(401).json({
                msg: "Error TOKEN - Usuario no existe en la base de datos",
            });
        }
        if (user.isActive == 0) {
            return res.status(401).json({
                msg: "Token No Valido - Usuario desabilitado",
            });
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: token,
        });
    }
});
exports.validarjwt = validarjwt;
//# sourceMappingURL=validarToken.js.map