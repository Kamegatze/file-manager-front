import {Injectable, OnDestroy} from '@angular/core';
import {AUTHENTICATION_API} from "@root/app.constant";
import {Login} from "@authentication/models/login";
import {HttpClient} from "@angular/common/http";
import {JwtToken} from "@authentication/models/jwt-token";
import {Observable, Subscription} from "rxjs";
import {LocalStorageImp} from "@utilities/local-storage/imp/local-storage-imp";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authenticationUrl: string = `${AUTHENTICATION_API}/api/auth/service`;
  private readonly keyJwtToken: string = "jwt-token";
  constructor(private http: HttpClient) { }
  public getKeyJwtObject(): string {
    return this.keyJwtToken;
  }
  public signin(login: Login): Observable<JwtToken> {
    return this.http.post<JwtToken>(`${this.authenticationUrl}/signin`, login)
  }
}
