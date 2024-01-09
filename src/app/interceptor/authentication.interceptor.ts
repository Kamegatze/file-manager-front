import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthenticationService} from "@authentication/services/authentication/authentication.service";
import {LocalStorageImp} from "@utilities/local-storage/imp/local-storage-imp";
import {Router} from "@angular/router";
import {JwtToken} from "@authentication/models/jwt-token";
import {AuthenticationHeader} from "@authentication/models/AuthenticationHeader";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private authentication: AuthenticationService,
              private localStorage: LocalStorageImp,
              private router: Router,) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwtObject = this.localStorage.getValueLocalStorage<JwtToken>(this.authentication.getKeyJwtObject());
    if(jwtObject === null) {
      if(!this.router.url.includes("/authentication")) {
        this.router.navigate(['authentication']).then();
      }
      return next.handle(req);
    }
    const authenticationHeader = <AuthenticationHeader>{
      Authorization: `Bearer ${jwtObject.tokenAccess}`,
      AuthorizationRefresh: jwtObject.refreshToken
    };

    const authRequest = req.clone({
      setHeaders: <any>authenticationHeader
    });

    return next.handle(authRequest);
  }

}
