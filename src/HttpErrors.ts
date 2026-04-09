import { BaseError } from "./BaseError.js";
import { schema } from "./error-schema.js";

const {
  badRequest,
  conflict,
  forbidden,
  internalServer,
  methodNotAllowed,
  notFound,
  notImplemented,
  serviceUnavailable,
  tooManyRequests,
  unauthorized,
  validation,
} = schema;

// 4xx errors

export class BadRequestError extends BaseError {
  constructor(message: string = badRequest.message) {
    super(message, badRequest.statusCode, badRequest.code);
  }
}
export class UnauthorizedError extends BaseError {
  constructor(message: string = unauthorized.message) {
    super(message, unauthorized.statusCode, unauthorized.code);
  }
}
export class ForbiddenError extends BaseError {
  constructor(message: string = forbidden.message) {
    super(message, forbidden.statusCode, forbidden.code);
  }
}

export class NotFoundError extends BaseError {
  constructor(message: string = notFound.message) {
    super(message, notFound.statusCode, notFound.code);
  }
}

export class MethodNotAllowedError extends BaseError {
  constructor(message: string = methodNotAllowed.message) {
    super(message, methodNotAllowed.statusCode, methodNotAllowed.code);
  }
}
export class ConflictError extends BaseError {
  constructor(message: string = conflict.message) {
    super(message, conflict.statusCode, conflict.code);
  }
}

export class ValidationError extends BaseError {
  constructor(message: string = validation.message) {
    super(message, validation.statusCode, validation.code);
  }
}

export class TooManyRequestsError extends BaseError {
  constructor(message: string = tooManyRequests.message) {
    super(message, tooManyRequests.statusCode, tooManyRequests.code);
  }
}

// 5xx errors

export class InternalServerError extends BaseError {
  constructor(message: string = internalServer.message) {
    super(message, internalServer.statusCode, internalServer.code);
  }
}

export class NotImplementedError extends BaseError {
  constructor(message: string = notImplemented.message) {
    super(message, notImplemented.statusCode, notImplemented.code);
  }
}

export class ServiceUnavailableError extends BaseError {
  constructor(message: string = serviceUnavailable.message) {
    super(message, serviceUnavailable.statusCode, serviceUnavailable.code);
  }
}
