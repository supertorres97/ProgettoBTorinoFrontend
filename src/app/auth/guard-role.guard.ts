import { inject } from '@angular/core';
import { CanActivateChildFn } from '@angular/router';
import { AuthService } from './auth.service';

export const guardRoleGuard: CanActivateChildFn = (childRoute, state) => {
  const authService =  inject(AuthService);
  
  return authService.isRoleAdmin();
};
