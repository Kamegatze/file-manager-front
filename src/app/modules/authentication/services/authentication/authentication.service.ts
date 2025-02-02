import {Injectable, OnDestroy} from '@angular/core';
import {API} from "@root/app.constant";
import {Login} from "@authentication/models/login";
import {HttpClient} from "@angular/common/http";
import {JwtToken} from "@authentication/models/jwt-token";
import {Observable, Subject, tap} from "rxjs";
import {SignUp} from "@authentication/models/sign-up";
import {ResponseEntity} from "@root/models/response-entity";
import {ChangePassword} from "@authentication/models/change-password";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnDestroy {
  private readonly authenticationUrl: string = `${API}/api/v1/auth/service`;
  private readonly keyJwtToken: string = "jwt-token";
  private subject$: Subject<boolean> | null = null

  constructor(private http: HttpClient) { }

  ngOnDestroy(): void {
    this.subject$?.unsubscribe()
  }

  public getKeyJwtObject(): string {
    return this.keyJwtToken;
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

  public isAuthentication(): Observable<boolean> {
    let subject = this.getSubject();
    this.http.get<any>(`${API}/api/v1/auth/is-authentication`)
      .subscribe({
        next: () => subject.next(true),
        error:  () => subject.next(false)
      });
    return subject.asObservable();
  }

  private getSubject(): Subject<boolean> {
    if (this.subject$ === null) {
      return new Subject<boolean>();
    }
    return this.subject$;
  }
}
