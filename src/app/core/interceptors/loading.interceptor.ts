import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  // req----> show loading
  const _NgxSpinnerService = inject(NgxSpinnerService);
  _NgxSpinnerService.show();
  //res ---> hide loading

  return next(req).pipe(
    finalize(() =>
      //method bteshtaghal ba3d ma el observable yerga3 khales yaany res
      {
        // hide loading
        _NgxSpinnerService.hide();
      }
    )
  );
};
