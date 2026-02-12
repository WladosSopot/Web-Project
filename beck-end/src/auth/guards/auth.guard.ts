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
    console.log(request);
    const tokenHeader = request.headers['Authorization'];
    // if (!tokenHeader) {
    //   throw new UnauthorizedException('Token missing');
    // }
    const [bearer, token] = tokenHeader.split(' ');
    // if (bearer !== 'Bearer' || !token) {
    //   throw new UnauthorizedException('Invalid token format');
    // }
    this.authService.virifyToken(token);
    return true;
  }
}
