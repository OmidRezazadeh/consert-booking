import { RpcException } from '@nestjs/microservices';
import { HttpStatus } from '@nestjs/common';

export class CustomRpcException extends RpcException {
  constructor(message: string, statusCode: number) {
    super({
      statusCode: statusCode,
      message: message,
      error: HttpStatus[statusCode] || 'Error',
    });
  }
}

export class RpcNotFoundException extends CustomRpcException {
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND);
  }
}

export class RpcForbiddenException extends CustomRpcException {
  constructor(message: string) {
    super(message, HttpStatus.FORBIDDEN);
  }
}

export class RpcRequestTimeoutException extends CustomRpcException {
  constructor(message: string) {
    super(message, HttpStatus.REQUEST_TIMEOUT);
  }
}

export class RpcUnauthorizedException extends CustomRpcException {
  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}

export class RpcBadRequestException extends CustomRpcException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST); 
  }
}

export class RpcThrottlerException extends CustomRpcException {
  constructor(message: string) {
    super(message, HttpStatus.TOO_MANY_REQUESTS);
  }
}

export class RpcConflictException extends CustomRpcException {
  constructor(message: string) {
    super(message, HttpStatus.CONFLICT);
  }
}

export class RpcInternalServerErrorException extends CustomRpcException {
  constructor(message: string) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}