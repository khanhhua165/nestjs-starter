import { IS_PUBLIC_KEY } from './../../../common/decorators/public.decorator';
import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // private reflector: Reflector;
  constructor(private reflector: Reflector) {
    super();
    // this.reflector = new Reflector();
  }
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }

  handleRequest(err, user, info: Error) {
    if (err || !user) {
      throw new HttpException(info.message, HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
}
