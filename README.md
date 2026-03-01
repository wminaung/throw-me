# throw-me

A lightweight, semantic, and TypeScript-first HTTP error factory.

## Installation

```bash
npm install throw-me
```

## Available Errors

| Method                     | Status       | Description                       |
| -------------------------- | ------------ | --------------------------------- |
| Throw.badRequest()         | 400          | Invalid or malformed request.     |
| Throw.validation()         | 400          | Input validation failures.        |
| Throw.unauthorized()       | 401          | Authentication is required.       |
| Throw.forbidden()          | 403          | Authenticated but not permitted.  |
| Throw.notFound()           | 404          | Resource does not exist.          |
| Throw.conflict()           | 409          | Resource already exists/conflict. |
| Throw.internal()           | 500          | Generic server failure.           |
| Throw.notImplemented()     | 501          | Feature not yet implemented.      |
| Throw.serviceUnavailable() | 503          | Server is down or overloaded.     |
| Throw.custom(msg, code)    | User defined | Throw any specific status code.   |

### Example

```typescript
import express, { Request, Response } from "express";
import { ThrowMe as Throw, BaseError } from "throw-me";

const app = express();

app.get("/user/:id", (req: Request, res: Response) => {
  const userId = req.params.id as string;
  try {
    if (!userId) {
      throw Throw.badRequest("Missing User ID");
    }

    if (userId !== "1") {
      throw Throw.unauthorized("Access Denied");
    }
    res.send("success");
  } catch (error: any) {
    if (error instanceof BaseError) {
      // Handles 400, 401, 404, etc. automatically
      res.status(error.statusCode).send(error.message);
    } else {
      // Fallback for unexpected bugs
      res.status(500).send("unexpected error!");
    }
  }
});
```

### Extending the Error Library

If the built-in methods in ThrowMe aren't enough, you can easily create custom errors that maintain compatibility with the BaseError system and TypeScript's type-checking.

```typescript
import { BaseError, ThrowMe } from "your-library-name";

// 1. Define your custom error class
class CustomPaymentError extends BaseError {
  public recoveryStep: string;

  constructor(message: string = "Payment required", recoveryStep: string) {
    super(message, 402); // 402 Payment Required
    this.recoveryStep = recoveryStep;
  }
}

// 2. Use it in your logic
function processOrder() {
  throw new CustomPaymentError(
    "Subscription expired",
    "Visit /billing to renew",
  );
}

// 3. Catch with full Type Safety
try {
  processOrder();
} catch (error) {
  if (error instanceof CustomPaymentError) {
    // TypeScript knows 'recoveryStep' exists here!
    console.error(`Error: ${error.message}. Action: ${error.recoveryStep}`);
  }
}
```
