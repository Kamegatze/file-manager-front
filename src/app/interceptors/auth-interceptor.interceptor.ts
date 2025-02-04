import { HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router: Router = inject(Router);
  let httpRequest = req.clone({
    withCredentials: true
  });

  return next(httpRequest).pipe(
    catchError(err => {
        if (err.status === 401 && err instanceof HttpErrorResponse && !router.url.includes("/authentication")) {
          console.error("Error authorization");
          router.navigate(['authentication']).then();
        }
        throw err;
      }
    )
  );
};
