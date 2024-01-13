import {Injectable} from '@angular/core';
import {AUTHENTICATION_API} from "@root/app.constant";
import {Login} from "@authentication/models/login";
import {HttpClient} from "@angular/common/http";
import {JwtToken} from "@authentication/models/jwt-token";
import {Observable} from "rxjs";

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
}
