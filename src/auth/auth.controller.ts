import { Body, Controller, Post, Res } from '@nestjs/common';
import { ResquestLoginDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { Builder } from 'builder-pattern';
import { MSAResponse } from 'src/common/response/msa-response';
import { User } from 'src/user/user.schema';
import { HTTP_MESSAGE, HTTP_STATUS } from 'src/common/enum/http-status';
import { Response } from 'express';

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
  ): Promise<MSAResponse<User>> {
    const { token, user } =
      await this.authService.extractToken(requestLoginDTO);

    res.cookie('MSA_TOKEN', token, {
      httpOnly: true,
      //   secure: true,
      maxAge: 60 * 60 * 1000 * 24 * 90,
    });

    return Builder<MSAResponse<User>>()
      .status(HTTP_STATUS.OK)
      .message(HTTP_MESSAGE.OK)
      .data(user)
      .build();
  }
}
