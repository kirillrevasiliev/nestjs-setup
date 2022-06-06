import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthUser = createParamDecorator((data: unknown, context: ExecutionContext) => context.switchToHttp().getRequest().user);
