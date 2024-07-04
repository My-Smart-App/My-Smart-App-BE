import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class CookieMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {

        const cookie = req.cookies?.token
        console.log("cookie", cookie);
        
        next();
    }
}   