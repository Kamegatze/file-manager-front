import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {AuthenticationService} from "@authentication/services/authentication/authentication.service";
import {HttpClient} from "@angular/common/http";
import {Subscription} from "rxjs";
import {JwtToken} from "@authentication/models/jwt-token";
import {LocalStorage} from "@utilities/local-storage/local-storage";
import {Location} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  private isAuthenticationSubscription$!: Subscription;
  constructor(private localStorage: LocalStorage,
              private router: Router,
              private authentication: AuthenticationService,
              private http: HttpClient,
              private location: Location
              ) {}

  ngOnInit(): void {
    const url: string = this.location.path();
    const authentication = this.localStorage
      .getValueLocalStorage<JwtToken>(this.authentication.getKeyJwtObject());
    if (authentication === null && !url.includes("/authentication")) {
      this.router.navigate(["authentication"]).then();
      return;
    }
    this.isAuthenticationSubscription$ = this.http
      .get<boolean>(`${this.authentication.getAuthenticationUrl()}/is-authentication`)
      .subscribe(isAuthentication => {
        if (!isAuthentication && !url.includes("/authentication")) {
          this.router.navigate(["authentication"]).then();
        }
      });
  }

  ngOnDestroy(): void {
    this.isAuthenticationSubscription$?.unsubscribe();
  }
}
