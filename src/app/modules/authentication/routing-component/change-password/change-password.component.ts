import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "@authentication/services/authentication/authentication.service";
import {ChangePassword} from "@authentication/models/change-password";
import {ActivatedRoute, Router} from "@angular/router";
import {response} from "express";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent implements OnInit{
  formChangePassword!: FormGroup;
  controlsName!: string[];
  messageError!: string;
  isViewRetryPassword!: Function;
  private token!: string;
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
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    })
  }

  submit() {
    const changePassword:ChangePassword = <ChangePassword>{
      ...this.formChangePassword.value,
      recoveryCode: this.token
    };
    this.authentication.changePassword(changePassword).subscribe({
      next: response => {
        this.router.navigate(["authentication"]).then();
      },
      error: err => {
        this.messageError = err;
      }
    });
  }
}
