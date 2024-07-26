import {
  ValidationPipe,
  ValidationError,
  BadRequestException,
} from '@nestjs/common';
import { HttpMessage, HttpStatus } from '../enum/http-status';

export class MSAValidationPipe extends ValidationPipe {
  constructor() {
    super({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const errors = validationErrors
          .map((error) => {
            if (error.constraints) {
              const constraints = Object.values(error.constraints);
              return { [error.property]: constraints.join(', ') };
            }
            return null;
          })
          .filter((error) => error !== null);

        return new BadRequestException({
          message: errors,
          error: HttpMessage.BAD_REQUEST,
          statusCode: HttpStatus.BAD_REQUEST,
        });
      },
    });
  }
}
