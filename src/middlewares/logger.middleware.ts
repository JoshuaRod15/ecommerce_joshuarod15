/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from "express";

export function loggerGlobal(req: Request, res: Response, next: NextFunction){
    const fecha = new Date()
    console.log(`Estas ejecutando un metodo ${req.method} en la ruta ${req.path}, ${fecha}`);
    next()
}

 