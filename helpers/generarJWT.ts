import jwt from "jsonwebtoken";

export const generarjwt = (payload: any) => {
  let expira = "30d"; 
  if(payload.name == "visita"){
    expira = "2h";
  }
  const privateKey: any = process.env.SECRETORPRIVATEKEY;
  return new Promise((resolve, reject) => {
    jwt.sign(payload, privateKey, { expiresIn: expira }, (error, token) => {
      if (error) {
        console.log(error);
        reject("No se pudo generar el token");
      } else {
        resolve(token);
      }
    });
  });
};
