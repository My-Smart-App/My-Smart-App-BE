import { Body, Controller, Post, Res } from '@nestjs/common';
import { ResponseLogin, ResquestLoginDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { Builder } from 'builder-pattern';
import { Response } from 'express';
import { MSAResponse } from '../common/response/msa-response';
import { User } from '../user/user.schema';
import { HttpMessage, HttpStatus } from '../common/enum/http-status';

/**
 * AuthController handles incoming HTTP requests related to auth operations.
 * @created 2024-07-06 Initial creation of AuthController by NhatNHH
 */
@Controller('/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  /**
   * Validate payload and authorization
   * @param ResquestLoginDTO
   * @returns Message of Auth and save JWT on cookie only
   */
  @Post('/login')
  async login(
    @Res() res: Response,
    @Body() requestLoginDTO: ResquestLoginDTO,
  ): Promise<MSAResponse<User | null>> {
    const { token, user }: ResponseLogin =
      await this.authService.handleLogin(requestLoginDTO);

    res.cookie('MSA_TOKEN', token, {
      httpOnly: true,
      // secure: true,
      maxAge: 60 * 60 * 1000 * 24 * 90,
    });

    return Builder<MSAResponse<User | null>>()
      .status(HttpStatus.OK)
      .message(HttpMessage.OK)
      .data(user)
      .build();
  }
}
