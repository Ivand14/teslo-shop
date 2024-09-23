import { CanActivate, ExecutionContext, ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';

import { META_ROLES } from 'src/auth/decorators/role-protected.decorator';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { users } from 'src/auth/entities/users.entity';

@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector
  ){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    

    const validRoles = this.reflector.get(META_ROLES,context.getHandler())

    const req = context.switchToHttp().getRequest()
    const user = req.user as users

    if(!user)
      throw new InternalServerErrorException('user not found - request')


    for (const role of user.roles) {
      if(validRoles.includes(role)){
        return true
      }
    }

    throw new ForbiddenException(`user needs a valid role : [ ${validRoles}]`)
  }
}
