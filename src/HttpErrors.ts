import { BaseError } from "./BaseError.js";

export class NotFoundError extends BaseError {
  constructor(message: string = "Resource not found") {
    super(message, 404);
  }
}

export class ValidationError extends BaseError {
  constructor(message: string = "Validation failed") {
    super(message, 400);
  }
}

export class UnauthorizedError extends BaseError {
  constructor(message: string = "Unauthorized access") {
    super(message, 401);
  }
}

export class ForbiddenError extends BaseError {
  constructor(message: string = "Forbidden access") {
    super(message, 403);
  }
}

export class ConflictError extends BaseError {
  constructor(message: string = "Conflict detected") {
    super(message, 409);
  }
}

export class InternalServerError extends BaseError {
  constructor(message: string = "Internal server error") {
    super(message, 500);
  }
}

export class BadRequestError extends BaseError {
  constructor(message: string = "Bad request") {
    super(message, 400);
  }
}

export class NotImplementedError extends BaseError {
  constructor(message: string = "Not implemented") {
    super(message, 501);
  }
}

export class ServiceUnavailableError extends BaseError {
  constructor(message: string = "Service unavailable") {
    super(message, 503);
  }
}
