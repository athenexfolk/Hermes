import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthorizationService } from '../service/authorization.service';

export const reverseAuthGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthorizationService);
  if (!authService.isLoggedIn) return true;
  let router = inject(Router);
  router.navigate(['/']);
  return false;
};
