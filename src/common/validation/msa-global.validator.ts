import {
  ValidationPipe,
  ValidationError,
  BadRequestException,
} from '@nestjs/common';
import { HttpMessage, HttpStatus } from '../enum/http-status';

/**
 * MSAValidationPipe extends NestJS's ValidationPipe to customize error handling
 * for validation failures.
 * This class overrides the default exception factory to format validation errors
 * in a more specific structure. It maps validation errors to a user-friendly format
 * where each property with constraints is associated with its respective error messages.
 * The formatted errors are included in a BadRequestException with a custom error message
 * and HTTP status code.
 * @author NhatNHH
 * @created 2024-07-08
 * @extends ValidationPipe
 */
export class MSAValidationPipe extends ValidationPipe {
  constructor() {
    super({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        // Map validation errors to a more readable format
        const errors = validationErrors
          .map((error) => {
            if (error.constraints) {
              const constraints = Object.values(error.constraints);
              return { [error.property]: constraints.join(', ') };
            }
            return null;
          })
          .filter((error) => error !== null);

        // Return a BadRequestException with custom message and status code
        return new BadRequestException({
          message: errors,
          error: HttpMessage.BAD_REQUEST,
          statusCode: HttpStatus.BAD_REQUEST,
        });
      },
    });
  }
}
