/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
 export class userValidateMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        const { email, name, password, address, phone, country, city} = req.body
        if(!email || !name || !password || !address || !phone || !country || !city){     
            return res.status(400).json({message:"Faltan datos"})
        }   
        next();
    }
}

@Injectable()
 export class productValidateMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        const { name, description, price, stock, imgUrl} = req.body
        if(!name || !description || !price || !stock || !imgUrl){     
            return res.status(400).json({message:"Faltan datos"})
        }   
        next();
    }
}

@Injectable()
export class signinValidateMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({message:"Debes ingresar usuario y contraseña"})
        }
        next();
    }
}