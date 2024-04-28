import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "@authentication/services/authentication/authentication.service";
import {ChangePassword} from "@authentication/models/change-password";
import {ActivatedRoute, Router} from "@angular/router";
import {response} from "express";
import {HttpErrorResponse} from "@angular/common/http";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  formChangePassword!: FormGroup;
  controlsName!: string[];
  messageError!: string;
  isViewRetryPassword!: Function;
  private token!: string;
  subscriptions$: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private authentication: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.formChangePassword = this.formBuilder.group({
      password: ["", [
        Validators.required,
        Validators.minLength(8)
      ]],
      passwordRetry: ["", [
        Validators.required,
        Validators.minLength(8)
      ]]
    });
    this.controlsName = Object.keys(this.formChangePassword.controls);
    this.isViewRetryPassword = () => {
      return (this.formChangePassword.get('password')?.value !== this.formChangePassword.get('passwordRetry')?.value
          && this.formChangePassword.get('passwordRetry')?.touched) ||
        (this.formChangePassword.get('passwordRetry')?.touched &&
          this.formChangePassword.get('passwordRetry')?.invalid);
    }
    const subscription = this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
    this.subscriptions$.push(subscription);
  }

  ngOnDestroy() {
    this.subscriptions$.forEach(subscription => subscription.unsubscribe());
  }

  submit() {
    const changePassword:ChangePassword = <ChangePassword>{
      ...this.formChangePassword.value,
      recoveryCode: this.token
    };
    const subscription = this.authentication.changePassword(changePassword).subscribe({
      complete: () => {
        this.messageError = undefined!;
        this.router.navigate(["authentication"]).then();
      },
      error: (err: HttpErrorResponse)=> {
        this.messageError = err.error.message;
      }
    });
    this.subscriptions$.push(subscription);
  }
}
