/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";


function validateRequest(req: Request){
    const authHeader = req.headers.authorization
    if(!authHeader){
        return false
    } 
    return true
}

@Injectable()
export class authGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        validateRequest(request)
        //return true
        return validateRequest(request);
        
    }
}