import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Array<'PILGRIM' | 'STAFF' | 'SUPER_ADMIN'>) => SetMetadata(ROLES_KEY, roles);
