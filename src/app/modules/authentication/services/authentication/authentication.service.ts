import {Injectable} from '@angular/core';
import {AUTHENTICATION_API} from "@root/app.constant";
import {Login} from "@authentication/models/login";
import {HttpClient} from "@angular/common/http";
import {JwtToken} from "@authentication/models/jwt-token";
import {Observable} from "rxjs";
import {SignUp} from "@authentication/models/sign-up";
import {ResponseEntity} from "@root/models/response-entity";
import {ChangePassword} from "@authentication/models/change-password";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly authenticationUrl: string = `${AUTHENTICATION_API}/api/auth/service`;
  private readonly keyJwtToken: string = "jwt-token";
  constructor(private http: HttpClient) { }
  public getKeyJwtObject(): string {
    return this.keyJwtToken;
  }
  public getAuthenticationUrl(): string {
    return this.authenticationUrl;
  }
  public signin(login: Login): Observable<JwtToken> {
    return this.http.post<JwtToken>(`${this.authenticationUrl}/signin`, login)
  }
  public signup(signUp: SignUp): Observable<ResponseEntity> {
    return this.http.post<ResponseEntity>(`${this.authenticationUrl}/signup`, signUp);
  }

  public sendLinkOnEmailForChangePassword(loginOrEmail: string): Observable<any> {
    const queryParam = {loginOrEmail};
    return this.http.post<ResponseEntity>(`${this.authenticationUrl}/send-email-change-password`,
      {},
      {params: queryParam});
  }

  public changePassword(changePassword: ChangePassword): Observable<ResponseEntity> {
    return this.http.post<ResponseEntity>(`${this.authenticationUrl}/change-password`, changePassword);
  }
}
