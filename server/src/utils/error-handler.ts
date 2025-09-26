import { InternalException } from "exceptions/internal-exception.ts"
import { ErrorCode, HttpException } from "exceptions/root.ts"
import { Request, Response, NextFunction } from "express"

export const errorHandler = (method: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await method(req, res, next)
        } catch(error: any) {
            let exception: HttpException
            if(error instanceof HttpException){
                exception = error;
            } else {
                exception = new InternalException('Something went wrong!', error, ErrorCode.INTERNAL_SERVER_ERROR);
            }
            next(exception)
        }
    }
}