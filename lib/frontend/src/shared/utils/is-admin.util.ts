import { Account } from '@entities/account';

export const isAdminUtil = (user: Account.Entity | null): boolean => user?.roles.some((role) => role.tag === 'ADMIN') || false;
