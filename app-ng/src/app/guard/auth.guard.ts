import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthorizationService } from '../service/authorization.service';

export const authGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthorizationService);
  if (authService.isLoggedIn) return true;
  let router = inject(Router);
  router.navigate(['/auth', 'login']);
  return false;
};
