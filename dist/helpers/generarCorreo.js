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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarCorreo = void 0;
const email_1 = require("../config/email");
const generarCorreo = (destinatario, asunto, cuerpo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Enviar el correo electrónico usando el transporter configurado
        yield email_1.transporter.sendMail((0, email_1.mailOptions)(destinatario, asunto, cuerpo));
        console.log(`Correo enviado a ${destinatario} con asunto: ${asunto}`);
    }
    catch (error) {
        console.error(`Error enviando correo a ${destinatario}:`, error);
        throw new Error('Error enviando correo');
    }
});
exports.generarCorreo = generarCorreo;
//# sourceMappingURL=generarCorreo.js.map