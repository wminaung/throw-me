# throw-me

A lightweight, semantic, and TypeScript-first HTTP error library using classes.

## Installation

```bash
npm install throw-me
```

## Available Errors

| Class                   | Status | Code                | Description                      |
| ----------------------- | ------ | ------------------- | -------------------------------- |
| BadRequestError         | 400    | BAD_REQUEST         | Invalid or malformed request.    |
| ValidationError         | 422    | VALIDATION_FAIL     | Input validation failures.       |
| UnauthorizedError       | 401    | UNAUTHORIZED        | Authentication is required.      |
| ForbiddenError          | 403    | FORBIDDEN           | Authenticated but not permitted. |
| NotFoundError           | 404    | NOT_FOUND           | Resource does not exist.         |
| MethodNotAllowedError   | 405    | METHOD_NOT_ALLOWED  | Method not allowed.              |
| ConflictError           | 409    | CONFLICT            | Resource conflict.               |
| TooManyRequestsError    | 429    | TOO_MANY_REQUESTS   | Too many requests.               |
| InternalServerError     | 500    | INTERNAL_SERVER     | Generic server failure.          |
| NotImplementedError     | 501    | NOT_IMPLEMENTED     | Feature not implemented.         |
| ServiceUnavailableError | 503    | SERVICE_UNAVAILABLE | Server unavailable.              |

## Example

```ts
import express, { Request, Response } from "express";
import { NotFoundError, UnauthorizedError, BaseError } from "throw-me";

const app = express();

app.get("/user/:id", (req: Request, res: Response) => {
  const userId = req.params.id as string;

  try {
    if (!userId) {
      throw new NotFoundError("Missing User ID");
    }

    if (userId !== "1") {
      throw new UnauthorizedError("Access Denied");
    }

    res.send("success");
  } catch (error: any) {
    if (error instanceof BaseError) {
      res.status(error.statusCode).send({
        message: error.message,
        code: error.code,
      });
    } else {
      res.status(500).send("unexpected error!");
    }
  }
});
```

## Features

- ✅ Strong TypeScript support
- ✅ Class-based errors (better `instanceof`)
- ✅ Consistent error schema
- ✅ Custom error codes
- ✅ Clean stack traces
- ✅ Fully testable

## Extending

Create your own custom error:

```ts
import { BaseError } from "throw-me";

class PaymentRequiredError extends BaseError {
  constructor(message = "Payment required") {
    super(message, 402, "PAYMENT_REQUIRED");
  }
}

// usage
throw new PaymentRequiredError("Subscription expired");
```

## Testing

Your errors are fully testable:

```ts
import { NotFoundError } from "throw-me";

const error = new NotFoundError();

console.log(error.statusCode); // 404
console.log(error.code); // NOT_FOUND
```
