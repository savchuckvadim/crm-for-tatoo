import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ResultCode } from '../interfaces/response.interface';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const errorResponse = {
      statusCode: status,
      message: Array.isArray(exceptionResponse['message']) 
        ? exceptionResponse['message'] 
        : [exceptionResponse['message'] || exception.message],
      error: exceptionResponse['error'] || HttpStatus[status],
      resultCode: ResultCode.ERROR
    };

    response.status(status).json(errorResponse);
  }
}


// @Catch(HttpException)
// export class HttpExceptionFilter implements ExceptionFilter {
//   catch(exception: HttpException, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     const request = ctx.getRequest<Request>();
//     const status = exception.getStatus();

//     // const responseBody: ApiResponse<null> = {
//     //   resultCode: 1,
//     //   message: exception.message,
//     //   description: exception.getResponse() as string[],
//     // };
//     const responseBody = {
//       ...exception.getResponse() as object,
//       resultCode: 1
//     }
//     response.status(status).json(responseBody);
//   }
// }
