import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const _ToastrService=inject(ToastrService)
  return next(req).pipe(catchError((err)=>
  {
    console.log('interceptor',err.error.message)
    _ToastrService.error(err.error.message, 'Fresh Cart')
    return throwError(()=>err)
  }))//res
};
