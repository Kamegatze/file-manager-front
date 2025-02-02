import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthenticationService} from "@authentication/services/authentication/authentication.service";
import {tap} from "rxjs";


export const authenticationGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const authenticationService: AuthenticationService = inject(AuthenticationService);

  return authenticationService.isAuthentication()
    .pipe(
      tap(isAuthentication => {
        if(!isAuthentication && !router.url.includes("/authentication")) {
          router.navigate(['authentication']).then();
        }
        return isAuthentication && router.url.includes("/authentication");
      })
    );
};
