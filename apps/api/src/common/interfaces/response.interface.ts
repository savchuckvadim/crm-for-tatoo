import { ApiProperty } from '@nestjs/swagger';

export enum ResultCode {
    SUCCESS = 0,
    ERROR = 1
}

export class ApiResponse<T> {
    @ApiProperty({
        enum: ResultCode,
        description: 'Response status code (0 for success, 1 for error)',
        example: ResultCode.SUCCESS
    })
    resultCode: ResultCode; // 0 - успех, 1 - ошибка

    @ApiProperty({ required: false })
    result?: T;           // данные ответа (при успехе)

    @ApiProperty({ 
        required: false,
        oneOf: [
            { type: 'string', example: 'Error message' },
            { type: 'array', items: { type: 'string' }, example: ['Name is required', 'Email is invalid'] }
        ],
        description: 'Error message or array of validation errors'
    })
    message?: string | string[];

    @ApiProperty({ required: false, type: [String] })
    description?: string[]; // массив сообщений ошибки (при ошибке)
}