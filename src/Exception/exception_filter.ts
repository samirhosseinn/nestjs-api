import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
  HttpStatus,
  ConflictException, // To use in case of conflicts like duplicate email
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { Request } from 'express';
import { EmailNotFound } from './custome_exception';

@Catch(BadRequestException, QueryFailedError, Error) // Catch both BadRequestException and QueryFailedError
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(
    exception: BadRequestException | QueryFailedError | Error,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Handling validation errors (BadRequestException)
    if (exception instanceof BadRequestException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse() as {
        message: string[] | string;
        error: string;
      };

      // Customizing the response for validation errors
      response.status(status).json({
        success: false,
        timestamp: new Date().toISOString(),
        path: request.url,
        exceptionResponse,
      });
    }

    // Handling TypeORM errors (QueryFailedError)
    else if (exception instanceof QueryFailedError) {
      const error = exception as any;

      // Check if it’s a unique constraint violation 
      if (error.code === "ER_DUP_ENTRY") {
        response.status(HttpStatus.CONFLICT).json({
          success: false,
          timestamp: new Date().toISOString(),
          path: request.url,
          error: 'Conflict', // Status description
          message: 'Email already exists', // Custom message for duplicate email
        });
      } else {
        // For other database errors
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          success: false,
          timestamp: new Date().toISOString(),
          path: request.url,
          error: 'Database error',
          message: error.message,
        });
      }
    } else if (exception instanceof EmailNotFound) {
      response.status(HttpStatus.CONFLICT).json({
        success: false,
        timestamp: new Date().toISOString(),
        path: request.url,
        error: '404 Not Found',
        message: 'Email Not Found',
      });

    } else {
      response.status(HttpStatus.CONFLICT).json({
        success: false,
        timestamp: new Date().toISOString(),
        path: request.url,
        error: 'Generic error',
        exception
      });
    }
  }
}
