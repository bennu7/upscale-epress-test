export class HttpException extends Error {
  public code: number;
  public message: string;

  constructor(code: number, message: string) {
    super(message);
    this.code = code;
    this.message = "Oops! " + message;
  }
}

/**
 * Returns a response with status code 400.
 */
export class HttpExceptionBadRequest extends HttpException {
  constructor(message: string) {
    super(400, message);
  }
}
/**
 * Returns a response with status code 401.
 */
export class HttpExceptionUnauthorize extends HttpException {
  constructor(message: string) {
    super(401, message);
  }
}

/**
 * Returns a response with status code 404.
 */
export class HttpExceptionNotFound extends HttpException {
  constructor(message: string) {
    super(404, message);
  }
}

/**
 * Returns a response with status code 429.
 */
export class HttpExceptionTooManyRequests extends HttpException {
  constructor(message: string) {
    super(429, message);
  }
}
