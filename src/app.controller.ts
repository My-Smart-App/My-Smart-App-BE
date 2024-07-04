import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(@Res({ passthrough: true }) res: Response): string {
    res.cookie('token', 'some-token-value',
      {
        httpOnly: true,
        maxAge: 900000,
        secure: true

      });
    return this.appService.getHello();
  }
}
