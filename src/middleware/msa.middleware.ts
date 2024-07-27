import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
/**
 * MSAMiddleware is a custom middleware for handling requests in the application.
 * This middleware implements the NestMiddleware interface and currently
 * performs no additional processing on incoming requests. It simply
 * passes control to the next middleware or route handler in the stack.
 * @author NhatNHH
 * @created 2024-07-06
 * @implements NestMiddleware
 */
@Injectable()
export class MSAMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    next();
  }
}
