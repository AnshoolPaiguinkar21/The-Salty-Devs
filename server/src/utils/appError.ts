import { HttpStatusCodes } from "./httpStatusCodes.ts";

export class AppError extends Error {
  public readonly statusCode: HttpStatusCodes;
  constructor(message: string, statusCode: HttpStatusCodes) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

// export class AppError extends Error {
//   statusCode: number;
//   constructor(statusCode: number, message: string) {
//     super(message);
//     this.statusCode = statusCode;
//     // This line is needed to properly extend the Error class in TS
//     Object.setPrototypeOf(this, AppError.prototype);
//   }
// }
