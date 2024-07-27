import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

/**
 * AuthGuard is a guard for handling authorization and authentication using JWT.
 * This guard intercepts incoming requests, extracts the JWT token from the Authorization header,
 * and verifies the token using the JwtService. If the token is valid, it attaches the decoded payload
 * to the request object for further use. If the token is missing or invalid, it throws an UnauthorizedException.
 * @author NhatNHH
 * @created 2024-07-06
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  /**
   * Determines if the request can proceed based on the authentication status.
   * @param context - The execution context of the request.
   * @returns A Promise that resolves to a boolean indicating if the request is allowed to proceed.
   * @throws UnauthorizedException if the token is missing or invalid.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeadet(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.TOKEN_SECRET,
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  /**
   * Extracts the JWT token from the Authorization header.
   */
  private extractTokenFromHeadet(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
