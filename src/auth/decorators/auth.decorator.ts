import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { RoleProtected } from './role-protected.decorator';
import { UserRoleGuard } from '../guards/user-role/user-role.guard';
import { validRoles } from '../interfaces/roles.interfaces';

export function Auth(...roles: validRoles[]) {
    return applyDecorators(
        RoleProtected(...roles),
        UseGuards(AuthGuard(), UserRoleGuard)
    );
}