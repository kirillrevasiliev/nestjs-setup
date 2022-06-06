import { applyDecorators, UseGuards } from '@nestjs/common';

import { Auth } from '@app/auth/decorators/auth.decorator';
import { ROLES } from '@app/user/user.constants';

import { AclRolesDecorator } from './acl.roles.decorator';
import { AclRolesGuard } from './acl.roles.guard';

export function Acl(...roles: ROLES[]) {
  return applyDecorators(UseGuards(AclRolesGuard), AclRolesDecorator(roles), Auth);
}
