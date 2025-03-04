"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarjwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generarjwt = (payload) => {
    let expira = "30d";
    if (payload.name == "visita") {
        expira = "2h";
    }
    const privateKey = process.env.SECRETORPRIVATEKEY;
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign(payload, privateKey, { expiresIn: expira }, (error, token) => {
            if (error) {
                console.log(error);
                reject("No se pudo generar el token");
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.generarjwt = generarjwt;
//# sourceMappingURL=generarJWT.js.map