import { describe, it, expect } from "vitest";
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
  TooManyRequestsError,
  MethodNotAllowedError,
} from "./HttpErrors.js";
import { errorStandard } from "./error-schema.js";
import { BaseError } from "./BaseError.js";

describe("HTTP Error Classes Tests", () => {
  const schema = errorStandard;
  const standardTests = [
    {
      ErrorClass: BadRequestError,
      statusCode: schema.badRequest.statusCode,
      errorCode: schema.badRequest.code,
    },
    {
      ErrorClass: ValidationError,
      statusCode: schema.validation.statusCode,
      errorCode: schema.validation.code,
    },
    {
      ErrorClass: UnauthorizedError,
      statusCode: schema.unauthorized.statusCode,
      errorCode: schema.unauthorized.code,
    },
    {
      ErrorClass: ForbiddenError,
      statusCode: schema.forbidden.statusCode,
      errorCode: schema.forbidden.code,
    },
    {
      ErrorClass: NotFoundError,
      statusCode: schema.notFound.statusCode,
      errorCode: schema.notFound.code,
    },
    {
      ErrorClass: MethodNotAllowedError,
      statusCode: schema.methodNotAllowed.statusCode,
      errorCode: schema.methodNotAllowed.code,
    },
    {
      ErrorClass: ConflictError,
      statusCode: schema.conflict.statusCode,
      errorCode: schema.conflict.code,
    },
    {
      ErrorClass: TooManyRequestsError,
      statusCode: schema.tooManyRequests.statusCode,
      errorCode: schema.tooManyRequests.code,
    },
    {
      ErrorClass: InternalServerError,
      statusCode: schema.internalServer.statusCode,
      errorCode: schema.internalServer.code,
    },
    {
      ErrorClass: NotImplementedError,
      statusCode: schema.notImplemented.statusCode,
      errorCode: schema.notImplemented.code,
    },
    {
      ErrorClass: ServiceUnavailableError,
      statusCode: schema.serviceUnavailable.statusCode,
      errorCode: schema.serviceUnavailable.code,
    },
  ] as const;

  standardTests.forEach(({ ErrorClass, statusCode, errorCode }) => {
    it(`new ${ErrorClass.name}() should have status ${statusCode} and code ${errorCode}`, () => {
      const message = `Custom message for ${ErrorClass.name}`;
      const error = new ErrorClass(message);

      expect(error).toBeInstanceOf(ErrorClass);
      expect(error).toBeInstanceOf(BaseError);
      expect(error.statusCode).toBe(statusCode);
      expect(error.code).toBe(errorCode);
      expect(error.message).toBe(message);
      expect(error.isOperational).toBe(true);
    });
  });

  it("should use default messages from schema when no string is passed", () => {
    const error = new NotFoundError();
    expect(error.message).toBe(schema.notFound.message);
  });

  it("should be catchable and maintain a clean stack trace", () => {
    const trigger = () => {
      throw new UnauthorizedError("Expired Token");
    };

    try {
      trigger();
    } catch (error: any) {
      expect(error).toBeInstanceOf(UnauthorizedError);
      expect(error.statusCode).toBe(schema.unauthorized.statusCode);
      expect(error.message).toBe("Expired Token");
      expect(error.code).toBe(schema.unauthorized.code);
      expect(error.stack).toBeDefined();
    }
  });

  it("should maintain proper prototype chain for instanceof checks", () => {
    const error = new InternalServerError();
    expect(error instanceof Error).toBe(true);
    expect(error instanceof BaseError).toBe(true);
    expect(error instanceof InternalServerError).toBe(true);
  });
});
