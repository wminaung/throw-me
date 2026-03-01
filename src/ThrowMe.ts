import { BaseError } from "./BaseError.js";
import {
  NotFoundError,
  ValidationError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
  InternalServerError,
  BadRequestError,
  NotImplementedError,
  ServiceUnavailableError,
} from "./HttpErrors.js";

export abstract class ThrowMe {
  private constructor() {}

  /** 400 - Bad Request */
  static badRequest(message?: string) {
    return new BadRequestError(message);
  }

  /** 400 - Validation Failed */
  static validation(message?: string) {
    return new ValidationError(message);
  }

  /** 401 - Unauthorized */
  static unauthorized(message?: string) {
    return new UnauthorizedError(message);
  }

  /** 403 - Forbidden */
  static forbidden(message?: string) {
    return new ForbiddenError(message);
  }

  /** 404 - Not Found */
  static notFound(message?: string) {
    return new NotFoundError(message);
  }

  /** 409 - Conflict */
  static conflict(message?: string) {
    return new ConflictError(message);
  }

  /** 500 - Internal Server Error */
  static internal(message?: string) {
    return new InternalServerError(message);
  }

  /** 501 - Not Implemented */
  static notImplemented(message?: string) {
    return new NotImplementedError(message);
  }

  /** 503 - Service Unavailable */
  static serviceUnavailable(message?: string) {
    return new ServiceUnavailableError(message);
  }

  static custom(message: string, statusCode: number) {
    // We can use the BaseError directly here
    return new (class extends BaseError {
      constructor() {
        super(message, statusCode);
      }
    })();
  }
}
