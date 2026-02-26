# throw-me

A lightweight, semantic, and TypeScript-first HTTP error factory. Stop manually creating error objects and start throwing them with style.

## Installation

```bash
npm install @wminaung/throw-me
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
