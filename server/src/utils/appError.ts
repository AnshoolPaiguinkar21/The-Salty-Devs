export class AppError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    // This line is needed to properly extend the Error class in TS
    Object.setPrototypeOf(this, AppError.prototype);
  }
}