import { describe, it, expect } from "vitest";
import { ThrowMe } from "./ThrowMe";
import {
  BaseError,
  NotFoundError,
  ValidationError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
  InternalServerError,
  BadRequestError,
  NotImplementedError,
  ServiceUnavailableError,
} from "./";

describe("ThrowMe Static Factory Tests", () => {
  const standardTests = [
    { method: "badRequest", expectedClass: BadRequestError, code: 400 },
    { method: "validation", expectedClass: ValidationError, code: 400 },
    { method: "unauthorized", expectedClass: UnauthorizedError, code: 401 },
    { method: "forbidden", expectedClass: ForbiddenError, code: 403 },
    { method: "notFound", expectedClass: NotFoundError, code: 404 },
    { method: "conflict", expectedClass: ConflictError, code: 409 },
    { method: "internal", expectedClass: InternalServerError, code: 500 },
    { method: "notImplemented", expectedClass: NotImplementedError, code: 501 },
    {
      method: "serviceUnavailable",
      expectedClass: ServiceUnavailableError,
      code: 503,
    },
  ] as const;

  standardTests.forEach(({ method, expectedClass, code }) => {
    it(`ThrowMe.${method}() should return an instance of ${expectedClass.name} with status ${code}`, () => {
      const message = `Test ${method} message`;
      const error = ThrowMe[method](message);

      expect(error).toBeInstanceOf(expectedClass);
      expect(error).toBeInstanceOf(BaseError);
      expect(error.statusCode).toBe(code);
      expect(error.message).toBe(message);
      expect(error.isOperational).toBe(true);
    });
  });

  // 2. Test the Custom method
  it("ThrowMe.custom() should return a BaseError instance with any status code", () => {
    const error = ThrowMe.custom("Custom Alert", 418); // I'm a teapot

    expect(error).toBeInstanceOf(BaseError);
    expect(error.statusCode).toBe(418);
    expect(error.message).toBe("Custom Alert");
  });

  // 3. Test Default Messages
  it("should use default messages when no string is passed", () => {
    const error = ThrowMe.notFound();
    expect(error.message).toBe("Resource not found"); // Matches your HttpErrors default
  });

  // 4. Test Error Catching & Stack Trace
  it("should be catchable and maintain a clean stack trace", () => {
    const trigger = () => {
      throw ThrowMe.unauthorized("Expired Token");
    };

    try {
      trigger();
    } catch (error: any) {
      expect(error).toBeInstanceOf(UnauthorizedError);
      expect(error.statusCode).toBe(401);
      expect(error.stack).toContain("ThrowMe.test.ts"); // Confirms trace points here
    }
  });

  // 5. Test prototype consistency (Crucial for instanceof checks)
  it("should maintain proper prototype chain for instanceof checks", () => {
    const error = ThrowMe.internal();
    expect(error instanceof Error).toBe(true);
    expect(error instanceof BaseError).toBe(true);
    expect(error instanceof InternalServerError).toBe(true);
  });
});
