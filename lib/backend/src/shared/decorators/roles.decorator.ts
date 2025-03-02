import { SetMetadata } from '@nestjs/common';
import { ROLES_TOKEN } from 'shared/tokens';

export const Roles = (...roles: string[]) => SetMetadata(ROLES_TOKEN, roles);
