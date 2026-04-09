export enum ErrorCode {
  BAD_REQUEST = "BAD_REQUEST",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  NOT_FOUND = "NOT_FOUND",
  METHOD_NOT_ALLOWED = "METHOD_NOT_ALLOWED",
  CONFLICT = "CONFLICT",
  VALIDATION_FAIL = "VALIDATION_FAIL",
  TOO_MANY_REQUESTS = "TOO_MANY_REQUESTS",
  INTERNAL_SERVER = "INTERNAL_SERVER",
  NOT_IMPLEMENTED = "NOT_IMPLEMENTED",
  SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE",
  GENERIC = "GENERIC",
}
export const schema = {
  badRequest: {
    statusCode: 400,
    message: "Bad request",
    code: ErrorCode.BAD_REQUEST,
  },
  unauthorized: {
    statusCode: 401,
    message: "Unauthorized access",
    code: ErrorCode.UNAUTHORIZED,
  },
  forbidden: {
    statusCode: 403,
    message: "Forbidden access",
    code: ErrorCode.FORBIDDEN,
  },
  notFound: {
    statusCode: 404,
    message: "Resource not found",
    code: ErrorCode.NOT_FOUND,
  },
  methodNotAllowed: {
    statusCode: 405,
    message: "Method not allowed",
    code: ErrorCode.METHOD_NOT_ALLOWED,
  },
  conflict: {
    statusCode: 409,
    message: "Conflict detected",
    code: ErrorCode.CONFLICT,
  },
  validation: {
    statusCode: 422,
    message: "Validation failed",
    code: ErrorCode.VALIDATION_FAIL,
  },
  tooManyRequests: {
    statusCode: 429,
    message: "Too many requests",
    code: ErrorCode.TOO_MANY_REQUESTS,
  },
  internalServer: {
    statusCode: 500,
    message: "Internal server error",
    code: ErrorCode.INTERNAL_SERVER,
  },
  notImplemented: {
    statusCode: 501,
    message: "Not implemented",
    code: ErrorCode.NOT_IMPLEMENTED,
  },
  serviceUnavailable: {
    statusCode: 503,
    message: "Service unavailable",
    code: ErrorCode.SERVICE_UNAVAILABLE,
  },
} as const;
