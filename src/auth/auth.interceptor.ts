import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        if (error instanceof HttpException && error.getStatus() === HttpStatus.UNAUTHORIZED) {
          const customResponse = {
            statusCode: error.getStatus(),
            message: 'Unauthorized',
            error: 'Unauthorized'
          };
          return throwError(() => new HttpException(customResponse, HttpStatus.UNAUTHORIZED));
        }
        return throwError(() => error);
      })
    );
  }
}