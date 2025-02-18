import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const guardGuard: CanActivateFn = (route, state) => {
  const authService =  inject(AuthService);
  const router = inject(Router);
  if(!authService.isAutentificated())
    router.navigate(["/login"])
  return authService.isAutentificated();
};
