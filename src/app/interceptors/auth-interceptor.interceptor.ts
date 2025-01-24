import { HttpInterceptorFn} from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  let httpRequest = req.clone({
    withCredentials: true
  });
  return next(httpRequest);
};
