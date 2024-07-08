import { ValidationPipe, ValidationError, BadRequestException } from '@nestjs/common';
import { HTTP_MESSAGE, HTTP_STATUS } from '../enum/http-status';

export class CustomValidationPipe extends ValidationPipe {
  constructor() {
    super({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const errors = validationErrors
          .map(error => {
            if (error.constraints) {
              const constraints = Object.values(error.constraints);
              return { [error.property]: constraints.join(', ') };
            }
            return null;
          })
          .filter(error => error !== null);

        return new BadRequestException({
          message: errors,
          error: HTTP_MESSAGE.BAD_REQUEST,
          statusCode: HTTP_STATUS.BAD_REQUEST,
        });
      },
    });
  }
}
