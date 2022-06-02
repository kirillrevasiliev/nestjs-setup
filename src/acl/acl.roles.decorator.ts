import { SetMetadata } from '@nestjs/common';

import { ROLES } from '@app/user/user.constants';

export const AclRolesDecorator = (roles: ROLES[]) => SetMetadata('roles', roles);
