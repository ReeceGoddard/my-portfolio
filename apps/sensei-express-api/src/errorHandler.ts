import { Request, Response, NextFunction } from 'express';

interface ErrorResponse {
    status: number;
    message: string;
}

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message || 'Internal Server Error';

    if (err.name === 'ValidationError') {
        statusCode = 400;
    }

    const errorResponse: ErrorResponse = {
        status: statusCode,
        message: message,
    };

    res.status(statusCode).json(errorResponse);
};
