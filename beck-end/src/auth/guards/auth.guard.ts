import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service.js';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request) {
    const tokenHeader = request.headers['authorization'];
    const userId = request.headers['userid'];
    if (!tokenHeader) {
      throw new UnauthorizedException('Token missing');
    }
    const [bearer, token] = tokenHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid token format');
    }
    const isValid = await this.authService.virifyToken(token, userId);
    if (isValid) {
      request.user = { id: userId };
      return true;
    }
    return false;
  }
}
