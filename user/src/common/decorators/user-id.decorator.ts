import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): number => {
    const request = ctx.switchToHttp().getRequest();
    // Get user ID from header (sent by gateway after JWT validation)
    const userId = request.headers['user'] || request.headers['x-user-id'];
    
    if (!userId) {
      throw new UnauthorizedException('User ID not found in request headers. Request must go through gateway.');
    }
    
    const parsedUserId = parseInt(userId, 10);
    
    if (isNaN(parsedUserId)) {
      throw new UnauthorizedException('Invalid user ID format in headers');
    }
    
    return parsedUserId;
  },
);

