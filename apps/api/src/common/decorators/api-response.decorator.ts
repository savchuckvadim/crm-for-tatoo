import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { ApiResponse, ResultCode } from '../interfaces/response.interface';

export const ApiCustomResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiExtraModels(ApiResponse, model),
    ApiOkResponse({
      description: 'Success response',
      schema: {
        type: 'object',
        properties: {
          resultCode: {
            type: 'number',
            enum: [ResultCode.SUCCESS],
            example: ResultCode.SUCCESS,
            description: 'Response status code (0 for success)'
          },
          result: {
            $ref: getSchemaPath(model),
            description: 'Response data'
          }
        },
        required: ['resultCode', 'result']
      }
    })
  );
};

export const ApiCustomErrorResponse = (description: string | string[]) => {
  const example = Array.isArray(description) ? description : [description];
  
  return applyDecorators(
    ApiExtraModels(ApiResponse),
    ApiOkResponse({
      description: 'Error response',
      schema: {
        type: 'object',
        properties: {
          statusCode: {
            type: 'number',
            example: 400,
            description: 'HTTP status code'
          },
          message: {
            type: 'array',
            items: { type: 'string' },
            example: example,
            description: 'Array of validation errors'
          },
          error: {
            type: 'string',
            example: 'Bad Request',
            description: 'Error type'
          },
          resultCode: {
            type: 'number',
            enum: [ResultCode.ERROR],
            example: ResultCode.ERROR,
            description: 'Response status code (1 for error)'
          }
        },
        required: ['statusCode', 'message', 'error', 'resultCode']
      }
    })
  );
}; 