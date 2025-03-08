import { Account } from '@entities/account';

export const isAdminUtil = (user: Account.Entity): boolean => user.roles.some((role) => role.tag === 'ADMIN');
