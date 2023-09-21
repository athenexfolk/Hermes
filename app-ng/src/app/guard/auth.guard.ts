import { CanActivateFn } from '@angular/router';
import { enviroment } from 'src/enviroment/enviroment.dev';

export const authGuard: CanActivateFn = (route, state) => {
  try{
    return undefined != JSON.parse(localStorage.getItem(enviroment.TOKEN_KEY)!);
  }
  catch{
    return false;
  }
};
