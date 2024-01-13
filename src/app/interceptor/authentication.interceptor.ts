import {
  HttpBackend, HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {catchError, Observable, switchMap} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthenticationService} from "@authentication/services/authentication/authentication.service";
import {LocalStorageImp} from "@utilities/local-storage/imp/local-storage-imp";
import {Router} from "@angular/router";
import {JwtToken} from "@authentication/models/jwt-token";
import {AuthenticationHeader} from "@authentication/models/AuthenticationHeader";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  private http!: HttpClient;
  constructor(private authentication: AuthenticationService,
              private localStorage: LocalStorageImp,
              private router: Router,
              httpBackend: HttpBackend) {
    this.http = new HttpClient(httpBackend);
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwtObject = this.localStorage.getValueLocalStorage<JwtToken>(this.authentication.getKeyJwtObject());
    if(jwtObject === null) {
      if(!this.router.url.includes("/authentication")) {
        this.router.navigate(['authentication']).then();
      }
      return next.handle(req);
    }

    const authenticationHeader: AuthenticationHeader = <AuthenticationHeader>{
      Authorization: jwtObject.tokenAccess !== undefined ? `Bearer ${jwtObject.tokenAccess}`: undefined,
      AuthorizationRefresh: jwtObject.refreshToken
    };

    /*
    * Проверка валидности refresh token.
    * */
    this.http.get<boolean>(`${this.authentication.getAuthenticationUrl()}/is-authentication`,
      {headers: <any>authenticationHeader}).subscribe(isAuthentication => {
      if (!isAuthentication && !this.router.url.includes("/authentication")) {
        this.router.navigate(['authentication']).then();
      }
    })

    const isInsertHeader = authenticationHeader.AuthorizationRefresh !== undefined
      && authenticationHeader.Authorization !== undefined && !this.router.url.includes("/authentication");

    const authRequest = req.clone({
      setHeaders: isInsertHeader ? <any>authenticationHeader : {}
    });


    return next.handle(authRequest).pipe(
      catchError((err) => {
        if (err.status === 401 && err instanceof HttpErrorResponse) {
          console.error("Error authorization");
          return this.updateAccessToken(`${this.authentication.getAuthenticationUrl()}/authentication`,
            {headers: {AuthorizationRefresh: jwtObject.refreshToken}}, next, authRequest, req, authenticationHeader);
        }
        throw `Error request by url: ${authRequest.url}. Details: ${err.message}`;
      })
    );
  }

  private updateAccessToken(url: string, headers: object, next: HttpHandler,
                            authRequest: HttpRequest<any>, req: HttpRequest<any>, authenticationHeader: AuthenticationHeader): Observable<HttpEvent<any>> {
    return this.http.get<JwtToken>(url, headers)
      .pipe(
        switchMap((jwtToken) => {

          if (jwtToken === null) {
            return next.handle(authRequest);
          }
          if (jwtToken === undefined) {
            return next.handle(authRequest);
          }
          this.localStorage.setValueLocalStorage(this.authentication.getKeyJwtObject(), jwtToken);
          const header = <AuthenticationHeader>{
            Authorization: jwtToken.tokenAccess !== undefined ? `Bearer ${jwtToken.tokenAccess}`: undefined,
            AuthorizationRefresh: jwtToken.refreshToken
          };
          const isInsertHeaderToken = authenticationHeader.AuthorizationRefresh !== undefined &&
            authenticationHeader.Authorization !== undefined;
          const request = req.clone({
            setHeaders: isInsertHeaderToken ? <any>header : {}
          });
          return next.handle(request);
    }));
  }

}
