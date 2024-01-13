import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {LocalStorageImp} from "@utilities/local-storage/imp/local-storage-imp";
import {AuthenticationService} from "@authentication/services/authentication/authentication.service";
import {HttpClient} from "@angular/common/http";
import {JwtToken} from "@authentication/models/jwt-token";
import {tap} from "rxjs";
import {AuthenticationHeader} from "@authentication/models/AuthenticationHeader";


export const authenticationGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const localStorageImp: LocalStorageImp = inject(LocalStorageImp);
  const authenticationService: AuthenticationService = inject(AuthenticationService);
  const http: HttpClient = inject(HttpClient);

  const authentication: JwtToken | null = localStorageImp.getValueLocalStorage<JwtToken>(authenticationService.getKeyJwtObject());
  if (authentication === null) {
    if (!router.url.includes("/authentication")) {
      router.navigate(['authentication']).then();
    }
    return false;
  }

  const authenticationHeader: AuthenticationHeader = <AuthenticationHeader>{
    Authorization: authentication.tokenAccess !== undefined ? `Bearer ${authentication.tokenAccess}`: undefined,
    AuthorizationRefresh: authentication.refreshToken
  };

  return http.get<boolean>(`${authenticationService.getAuthenticationUrl()}/is-authentication`, {headers: <any>authenticationHeader})
    .pipe(
      tap(isAuthentication => {
        if(!isAuthentication && !router.url.includes("/authentication")) {
          router.navigate(['authentication']).then();
        }
        return isAuthentication && router.url.includes("/authentication");
      })
    );
};
