import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const _Router=inject(Router);
  //const _PLATFORM_ID=inject(PLATFORM_ID);
  //check type of Global Object !== undefined yaany mawdog
 // if(isPlatformBrowser(_PLATFORM_ID))  momken tare2a de bardo 
  if(typeof localStorage!=='undefined')
  {
    if(localStorage.getItem('userToken')!==null)
      {
        return true;
      }
      else{
        //navigate to login
        _Router.navigate(['/login']);
        return false;
      }
  }
  else{
    return false;
  }


};
